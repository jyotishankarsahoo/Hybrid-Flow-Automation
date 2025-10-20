import { Page, test as base_test, expect, TestInfo } from "@playwright/test";
import { ArticlePage } from "../pages/ArticlePage";

type CustomPageFixture = {
    articlePage: ArticlePage;
};
export const test = base_test.extend<CustomPageFixture>({
    page: async ({ page }, use: Function, testInfo: TestInfo) => {
        await use(page);
    },
    articlePage: async ({ page }, use: Function) => {
        const articlePage = new ArticlePage(page);
        await use(articlePage);
    },
});

export { expect, test as describe };
