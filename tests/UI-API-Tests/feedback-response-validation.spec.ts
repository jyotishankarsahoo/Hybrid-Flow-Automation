import { test } from "../../utilities/test-utilities";
import { FeedbackResponsePayload } from "../../utilities/interfaces/FeedbackPayload";

test.describe("Feedback Response Validation", () => {
    test.beforeEach(async ({ page }) => {
        page.goto("102640");
        await page.waitForLoadState("networkidle");
    });
    test("Validate Feedback Response for Helpful Feedback", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const response: FeedbackResponsePayload = true;
        const apiPromise = feedbackAPIService.assertResponse(response);
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await apiPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
    test("Validate Feedback Response for Not Helpful Feedback", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const response: FeedbackResponsePayload = true;
        const apiPromise = feedbackAPIService.assertResponse(response);
        await articlePage.clickOnThumbsDown();
        await articlePage.submitFeedback();
        await apiPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
    test("Validate Feedback Response for Helpful with comment", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        await articlePage.clickOnThumbsUp();
        await articlePage.enterFeedbackComment("This is helpful.");
        const response: FeedbackResponsePayload = true;
        const apiPromise = feedbackAPIService.assertResponse(response);
        await articlePage.submitFeedback();
        await apiPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
    test("Validate Feedback Response for Not Helpful with comment", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        await articlePage.clickOnThumbsDown();
        await articlePage.enterFeedbackComment("This is not helpful.");
        const response: FeedbackResponsePayload = true;
        const apiPromise = feedbackAPIService.assertResponse(response);
        await articlePage.submitFeedback();
        await apiPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
});
