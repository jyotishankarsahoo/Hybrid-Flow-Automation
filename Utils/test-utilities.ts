import { test as base_test, expect, TestInfo } from "@playwright/test";
import { ArticlePage } from "../pages/ArticlePage";
import { takeScreenshotIfFailed } from "./screenshot-helper";

type CustomPageFixture = {
    articlePage: ArticlePage;
};
export const test = base_test.extend<CustomPageFixture>({
    page: async ({ page }, use: Function, testInfo: TestInfo) => {
        await use(page);
        await takeScreenshotIfFailed(page, testInfo);
    },
    articlePage: async ({ page }, use: Function) => {
        const articlePage = new ArticlePage(page);
        await use(articlePage);
    },
});

export { expect };