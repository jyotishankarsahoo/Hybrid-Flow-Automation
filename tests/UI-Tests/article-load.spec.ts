import { test } from "../../utilities/test-utilities";

test.describe("Article Loading Flow", () => {
    test.beforeEach(async ({ page }) => {
        page.goto("102640");
        await page.waitForLoadState("networkidle");
    });

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
