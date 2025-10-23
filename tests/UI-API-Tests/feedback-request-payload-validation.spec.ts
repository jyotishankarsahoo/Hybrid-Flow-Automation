import { test } from "../../utilities/test-utilities";
import { FeedbackRequestPayload } from "../../utilities/interfaces/FeedbackPayload";

test.describe("Feedback Request Payload Validation", () => {
    test.beforeEach(async ({ page }) => {
        page.goto("102640");
        await page.waitForLoadState("networkidle");
    });
    test("Validate Feedback Request Payload for Helpful Feedback", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const requestPayload: FeedbackRequestPayload = {
            rating: 5,
            comments: "",
            id: "102640",
        };
        const apiPromise = feedbackAPIService.assertRequest(
            requestPayload,
            true
        );
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await apiPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
    test("Validate Feedback Request Payload for Not Helpful Feedback", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const requestPayload: FeedbackRequestPayload = {
            rating: 1,
            comments: "",
            id: "102640",
        };
        const apiPromise = feedbackAPIService.assertRequest(
            requestPayload,
            true
        );
        await articlePage.clickOnThumbsDown();
        await articlePage.submitFeedback();
        await apiPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
    test("Validate Feedback Request Payload for Helpful Feedback with comment", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        await articlePage.clickOnThumbsUp();
        await articlePage.enterFeedbackComment("This is helpful.");
        const requestPayload: FeedbackRequestPayload = {
            rating: 5,
            comments: "This is helpful.",
            id: "102640",
        };
        const apiPromise = feedbackAPIService.assertRequest(
            requestPayload,
            true
        );
        await articlePage.submitFeedback();
        await apiPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
    test("Validate Feedback Request Payload for Not Helpful Feedback with comment", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        await articlePage.clickOnThumbsDown();
        await articlePage.enterFeedbackComment("This is not helpful.");
        const requestPayload: FeedbackRequestPayload = {
            rating: 1,
            comments: "This is not helpful.",
            id: "102640",
        };
        const apiPromise = feedbackAPIService.assertRequest(
            requestPayload,
            true
        );
        await articlePage.submitFeedback();
        await apiPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
});
