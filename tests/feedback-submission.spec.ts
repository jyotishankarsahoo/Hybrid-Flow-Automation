import { test } from "../utils/test-utilities";

test.describe("Feedback Submission Flow", () => {
    test.beforeEach(async ({ page }) => {
        page.goto("102640");
        await page.waitForLoadState("networkidle");
    });

    test("Verify Helpful Feedback Submission without comment", async ({
        articlePage,
    }) => {
        await articlePage.clickOnThumbsUp();
        await articlePage.verifyCommentSectionDetails(
            "We’re glad this article helped."
        );
        await articlePage.submitFeedback();
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });

    test("Verify Not Helpful Feedback Submission without comment", async ({
        articlePage,
    }) => {
        await articlePage.clickOnThumbsDown();
        await articlePage.verifyCommentSectionDetails(
            "Thanks for letting us know."
        );
        await articlePage.submitFeedback();
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });

    test("Verify Helpful Feedback Submission with comment", async ({
        articlePage,
    }) => {
        await articlePage.clickOnThumbsUp();
        await articlePage.verifyCommentSectionDetails(
            "We’re glad this article helped."
        );
        await articlePage.enterFeedbackComment(
            "This article was very helpful!"
        );
        await articlePage.submitFeedback();
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });

    test("Verify Not Helpful Feedback Submission with comment", async ({
        articlePage,
    }) => {
        await articlePage.clickOnThumbsDown();
        await articlePage.verifyCommentSectionDetails(
            "Thanks for letting us know."
        );
        await articlePage.enterFeedbackComment(
            "This article did not address my issue."
        );
        await articlePage.submitFeedback();
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
});
