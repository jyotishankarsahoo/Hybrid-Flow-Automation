import { test as base_test, expect, TestInfo } from "@playwright/test";
import { ArticlePage } from "../pages/ArticlePage";
import { takeScreenshotIfFailed } from "./screenshot-helper";
import { FeedbackAPIService } from "../services/FeedbackAPIService";

type CustomPageFixture = {
    articlePage: ArticlePage;
    feedbackAPIService: FeedbackAPIService;
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
    feedbackAPIService: [
        async ({ page }, use: Function) => {
            const service = new FeedbackAPIService(page);
            await use(service);
            await service.cleanupRoutes();
        },
        { scope: "test" },
    ],
});

export { expect };
