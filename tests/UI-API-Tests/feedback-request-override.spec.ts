import { test } from "../../utilities/test-utilities";
import {
    FeedbackRequestPayload,
    FeedbackResponsePayload,
} from "../../utilities/interfaces/FeedbackPayload";

test.describe("Feedback Response validation with Request Override", () => {
    test.beforeEach(async ({ page }) => {
        page.goto("102640");
        await page.waitForLoadState("networkidle");
    });

    test("Validate Feedback Response with negative rating", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const requestPayload: Partial<FeedbackRequestPayload> = {
            rating: -2,
        };
        const expectedResponsePayload: FeedbackResponsePayload = {
            type: "about:blank",
            title: "Bad Request",
            status: 400,
            detail: "Invalid request content.",
            instance: "/ContentServices/api/v2/article/rating",
        };
        const assertionPromise = feedbackAPIService.modifyRequest(
            requestPayload,
            expectedResponsePayload
        );
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await assertionPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });

    test("Validate Feedback Request with invalid article id", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const requestPayload: Partial<FeedbackRequestPayload> = {
            id: "111120",
        };
        const expectedResponsePayload: Partial<FeedbackResponsePayload> = {
            errorCode: "602",
            status: "400",
            errorMessage: "Article does not exist",
        };
        const assertionPromise = feedbackAPIService.modifyRequest(
            requestPayload,
            expectedResponsePayload
        );
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await assertionPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });

    test("Validate Feedback Request with invalid content type", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const requestPayload: Partial<FeedbackRequestPayload> = {
            contentType: "GB",
        };
        const expectedResponsePayload: FeedbackResponsePayload = {
            message:
                "Failed to add ratings for 102640 in locale en_US .Supplied request body data is not correct.",
        };
        const assertionPromise = feedbackAPIService.modifyRequest(
            requestPayload,
            expectedResponsePayload
        );
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await assertionPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });

    test("Validate Feedback Request with invalid locale", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const requestPayload: Partial<FeedbackRequestPayload> = {
            locale: "de_US",
        };
        const expectedResponsePayload: Partial<FeedbackResponsePayload> = {
            errorCode: "602",
            status: "400",
            errorMessage: "Article does not exist",
        };
        const assertionPromise = feedbackAPIService.modifyRequest(
            requestPayload,
            expectedResponsePayload
        );
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await assertionPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });

    test("Validate Feedback Request with max Comment", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const requestPayload: Partial<FeedbackRequestPayload> = {
            comments: "*🐨".repeat(500),
        };
        const expectedResponsePayload: FeedbackResponsePayload = true;
        const assertionPromise = feedbackAPIService.modifyRequest(
            requestPayload,
            expectedResponsePayload
        );
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await assertionPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
});
