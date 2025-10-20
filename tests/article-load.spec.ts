import { ArticlePage } from "../pages/ArticlePage";
import { test, expect } from "../Utils/test-utilities";

test.describe("Verify Support Article Details", () => {
    test("Verify Header, Subheader and Publish Date are shown", async ({
        page,
    }) => {
        let articleHeader = page.locator("h1.gb-header");
        let articleSubHeader = articleHeader
            .locator("..")
            .locator("p.subheader");
        let publishDate = page.locator(".mod-date");
        await expect(articleHeader).toBeVisible();
        await expect(articleSubHeader).toBeVisible();
        await expect(publishDate).toBeVisible();

        await expect(articleHeader).not.toBeEmpty();
        await expect(articleSubHeader).not.toBeEmpty();
        await expect(publishDate).not.toBeEmpty();
        console.log(await publishDate.innerText());
        await expect(articleHeader).toHaveText(
            "If your Apple Account is locked, not active, or disabled"
        );
        await expect(articleSubHeader).toHaveText(
            "Learn what to do if you can’t sign in to your Apple Account or Apple services because your account is locked, not active, or disabled."
        );
        await expect(publishDate).toContainText("Published Date:");
    });
    test("Verify Feedback Buttons are Present", async ({ page }) => {
        let yesButton = page.locator("#yes-button");
        let noButton = page.locator("#no-button");
        let submitButton = page.locator("#submit-feedback");
        let ratingConfirmationLabel = page.locator("#rating-done");
        await expect(yesButton).toBeVisible();
        await expect(noButton).toBeVisible();
        await expect(submitButton).not.toBeVisible();
        await expect(ratingConfirmationLabel).not.toBeVisible();

        await expect(yesButton).toBeEnabled();
        await expect(noButton).toBeEnabled();
        await expect(yesButton).toHaveText("Yes");
        await expect(noButton).toHaveText("No");
    });

    test("Verify Helpful Feedback Submission with out comment", async ({
        page,
    }) => {
        let yesButton = page.locator("#yes-button");
        let submitButton = page.locator("#submit-feedback");
        let ratingConfirmationLabel = page.locator("#rating-done");

        await expect(yesButton).toBeVisible();
        await expect(yesButton).toBeEnabled();
        await expect(submitButton).not.toBeVisible();

        await yesButton.click();
        await expect(submitButton).toBeVisible();
        await expect(submitButton).toBeEnabled();
        await submitButton.click();
        await expect(ratingConfirmationLabel).toBeVisible();
        expect(ratingConfirmationLabel).toHaveText("Thanks for your feedback.");
    });

    test("Verify Not Helpful Feedback Submission with out comment", async ({
        page,
    }) => {
        let noButton = page.locator("#no-button");
        let submitButton = page.locator("#submit-feedback");
        let ratingConfirmationLabel = page.locator("#rating-done");

        await expect(noButton).toBeVisible();
        await expect(noButton).toBeEnabled();
        await expect(submitButton).not.toBeVisible();

        await noButton.click();
        await expect(submitButton).toBeVisible();
        await expect(submitButton).toBeEnabled();
        await submitButton.click();
        await expect(ratingConfirmationLabel).toBeVisible();
        expect(ratingConfirmationLabel).toHaveText("Thanks for your feedback.");
    });

    test("Verify Helpful Feedback Submission with comment", async ({
        page,
    }) => {
        let yesButton = page.locator("#yes-button");
        let submitButton = page.locator("#submit-feedback");
        let ratingConfirmationLabel = page.locator("#rating-done");
        let commentHeader = page.locator("#feedback-label");
        let doNotIncludeLabel = page.locator(".dont-include-label");
        let commentTextArea = page.locator("textarea.form-text-area");
        await yesButton.click();
        await expect(commentHeader).toBeVisible();
        await expect(doNotIncludeLabel).toBeVisible();
        await expect(commentTextArea).toBeVisible();
        await expect(commentTextArea).toBeEditable();
        commentTextArea.fill("This is from me !!!!");
        await expect(commentHeader).toHaveText(
            "We’re glad this article helped."
        );
        await expect(doNotIncludeLabel).toHaveText(
            "Please don’t include any personal information in your comment."
        );
        await page.route("**/realtimeapi/ratings", async (route) => {
            let request = route.request();
            console.log(request.url());
            console.log(request.method());
            const requestBody = request.postDataJSON();
            console.log(JSON.stringify(requestBody));
            expect(requestBody.comments).toBe("This is from me !!!!");
            expect(requestBody.rating).toBe(5);
            expect(requestBody.id).toBe("102640");
            await route.continue();
        });
        await submitButton.click();
        await expect(ratingConfirmationLabel).toBeVisible();

        await expect(ratingConfirmationLabel).toHaveText(
            "Thanks for your feedback."
        );
    });
});

test.describe("Verify Support Article Details using Page Object Model", () => {
    test("Verify Header, Subheader and Publish Date are shown", async ({
        articlePage,
    }) => {
        const ExpectedText = {
            header: "If your Apple Account is locked, not active, or disabled",
            subheader:
                "Learn what to do if you can’t sign in to your Apple Account or Apple services because your account is locked, not active, or disabled.",
        };
        await articlePage.verifyArticleDetails(
            ExpectedText.header,
            ExpectedText.subheader
        );
    });
    test("Verify Article Feedback Section's initial state and Visibility", async ({
        articlePage,
    }) => {
        await articlePage.verifyInitialFeedbackState();
    });
});
