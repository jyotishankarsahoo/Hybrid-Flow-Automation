import { Page, test as base_test, expect, TestInfo } from "@playwright/test";
import { ArticlePage } from "../pages/ArticlePage";

type CustomPageFixture = {
    articlePage: ArticlePage;
};
export const test = base_test.extend<CustomPageFixture>({
    page: async ({ page }, use: Function, testInfo: TestInfo) => {
        await page.goto("https://support.apple.com/en-us/102640", {
            timeout: 60000,
        });
        await page.waitForLoadState("networkidle");
        await use(page);
        expect(await page.title()).toBe(
            "If your Apple Account is locked, not active, or disabled - Apple Support"
        );
    },
    articlePage: async ({ page }, use: Function) => {
        const articlePage = new ArticlePage(page);
        await use(articlePage);
    },
});

export { expect, test as describe };
