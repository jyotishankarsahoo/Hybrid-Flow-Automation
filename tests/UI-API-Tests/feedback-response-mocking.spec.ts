import { test } from "../../utilities/test-utilities";
import { FeedbackMockResponseConfig } from "../../utilities/interfaces/FeedbackPayload";

test.describe("Response Mocking: Feedback Negative flows", () => {
    test.beforeEach(async ({ page }) => {
        page.goto("102640");
        await page.waitForLoadState("networkidle");
    });
    test("Validate Feedback Confirmation For Bad Request", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const mockResponse: FeedbackMockResponseConfig = {
            statusCode: 200,
            responseBody: {
                type: "about:blank",
                title: "Bad Request",
                status: 400,
                detail: "Invalid request content.",
                instance: "/ContentServices/api/v2/article/rating",
            },
            contentType: "application/json",
        };
        const mockPromise = feedbackAPIService.mockResponse(mockResponse);
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await mockPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
    test("Validate Feedback Confirmation for Article Not Found", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const mockResponse: FeedbackMockResponseConfig = {
            statusCode: 200,
            responseBody: {
                timestamp: "2025-09-22T19:52:49.821596529",
                status: "400",
                errorCode: "602",
                errorMessage: "Article does not exist",
                traceId: "3952110e32149379909bfb57962a1d99",
            },
            contentType: "application/json",
        };
        const mockPromise = feedbackAPIService.mockResponse(mockResponse);
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await mockPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
    test("Validate Feedback Confirmation when unable to add rating", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const mockResponse: FeedbackMockResponseConfig = {
            statusCode: 400,
            responseBody: {
                message:
                    "Failed to add ratings for 111111 in locale en_US .Supplied request body data is not correct.",
            },
            contentType: "application/json",
        };
        const mockPromise = feedbackAPIService.mockResponse(mockResponse);
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await mockPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
    test("Validate Feedback Confirmation when article not present in locale", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const mockResponse: FeedbackMockResponseConfig = {
            statusCode: 400,
            responseBody: {
                timestamp: "2025-09-22T19:52:49.821596529",
                status: "400",
                errorCode: "602",
                errorMessage: "Article does not exist",
                traceId: "f93e59f479dce953faa594e65017b578",
            },
            contentType: "application/json",
        };
        const mockPromise = feedbackAPIService.mockResponse(mockResponse);
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await mockPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
    test.skip("Validate Feedback Response with max Comment", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const mockResponse: FeedbackMockResponseConfig = {
            statusCode: 200,
            responseBody: true,
            contentType: "application/json",
        };
        const mockPromise = feedbackAPIService.mockResponse(mockResponse);
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await mockPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
});
