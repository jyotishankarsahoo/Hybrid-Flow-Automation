import { test } from "../../utilities/test-utilities";
import { FeedbackRequestPayload } from "../../utilities/interfaces/FeedbackPayload";

test.describe("Feedback Response validation with Request Override", () => {
    test.beforeEach(async ({ page }) => {
        page.goto("102640");
        await page.waitForLoadState("networkidle");
    });
    /*
    --- MODIFIED REQUEST TRANSACTION LOG ---
SENT PAYLOAD: {"id":"102640","rating":-2,"locale":"en_US","comments":"","contentType":"AC"}
RESPONSE URL: https://support.apple.com/ols/realtimeapi/ratings
RESPONSE STATUS: 200
RESPONSE BODY: {"type":"about:blank","title":"Bad Request","status":400,"detail":"Invalid request content.","instance":"/ContentServices/api/v2/article/rating"}
    */
    test("Validate Feedback Response with negative rating", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const requestPayload: Partial<FeedbackRequestPayload> = {
            rating: -2,
            comments: "",
            id: "102640",
            contentType: "AC",
            locale: "en_US",
        };
        const assertionPromise =
            feedbackAPIService.modifyRequest(requestPayload);
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await assertionPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
    /*
    --- MODIFIED REQUEST TRANSACTION LOG ---
SENT PAYLOAD: {"id":"111120","rating":5,"locale":"en_US","comments":"","contentType":"AC"}
RESPONSE URL: https://support.apple.com/ols/realtimeapi/ratings
RESPONSE STATUS: 200
RESPONSE BODY: {"timestamp":"2025-09-22T19:52:49.821596529","status":"400","errorCode":"602","errorMessage":"Article does not exist","traceId":"3952110e32149379909bfb57962a1d99"}
    */
    test("Validate Feedback Request with invalid article id", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const requestPayload: Partial<FeedbackRequestPayload> = {
            rating: 5,
            comments: "",
            id: "111120",
            contentType: "AC",
            locale: "en_US",
        };
        const assertionPromise =
            feedbackAPIService.modifyRequest(requestPayload);
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await assertionPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
    /*
    --- MODIFIED REQUEST TRANSACTION LOG ---
SENT PAYLOAD: {"id":"111111","rating":5,"locale":"en_US","comments":"","contentType":"GB"}
RESPONSE URL: https://support.apple.com/ols/realtimeapi/ratings
RESPONSE STATUS: 400
RESPONSE BODY: {"message":"Failed to add ratings for 111111 in locale en_US .Supplied request body data is not correct."}
    */
    test("Validate Feedback Request with invalid content type", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const requestPayload: Partial<FeedbackRequestPayload> = {
            rating: 5,
            comments: "",
            id: "111111",
            contentType: "GB",
            locale: "en_US",
        };
        const assertionPromise =
            feedbackAPIService.modifyRequest(requestPayload);
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await assertionPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
    /*
    --- MODIFIED REQUEST TRANSACTION LOG ---
SENT PAYLOAD: {"id":"111111","rating":5,"locale":"en_XY","comments":"","contentType":"AC"}
RESPONSE URL: https://support.apple.com/ols/realtimeapi/ratings
RESPONSE STATUS: 200
RESPONSE BODY: {"timestamp":"2025-09-22T19:52:49.821596529","status":"400","errorCode":"602","errorMessage":"Article does not exist","traceId":"f93e59f479dce953faa594e65017b578"}
    */
    test("Validate Feedback Request with invalid locale", async ({
        articlePage,
        feedbackAPIService,
    }) => {
        const requestPayload: Partial<FeedbackRequestPayload> = {
            rating: 5,
            comments: "",
            id: "111111",
            contentType: "AC",
            locale: "de_US",
        };
        const assertionPromise =
            feedbackAPIService.modifyRequest(requestPayload);
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
            rating: 5,
            comments: "*🐨".repeat(500),
            id: "111111",
            contentType: "AC",
            locale: "en_US",
        };
        const assertionPromise =
            feedbackAPIService.modifyRequest(requestPayload);
        await articlePage.clickOnThumbsUp();
        await articlePage.submitFeedback();
        await assertionPromise;
        await articlePage.verifyFeedbackSubmissionConfirmation();
    });
});
