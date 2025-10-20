import { Page, test as base_test, expect, TestInfo } from "@playwright/test";
import { ArticlePage } from "../pages/ArticlePage";
import fs from "fs";
import path from "path";

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

// Takes a screenshot of the page if the test has failed.
async function takeScreenshotIfFailed(page: Page, testInfo: TestInfo) {
    if (testInfo.status !== "failed") return;

    const screenshotDir = path.join(__dirname, "../screenshots");
    fs.mkdirSync(screenshotDir, { recursive: true });

    const currentDateTime: string = new Date()
        .toISOString()
        .replace(/[:T.]/g, "_")
        .slice(0, -5);
    const screenshotFileName = `${testInfo.title.replace(
        /\s+/g,
        "_"
    )}_failed_${currentDateTime}.png`;
    const screenshotPath = path.join(screenshotDir, screenshotFileName);
    await page.screenshot({ path: screenshotPath, fullPage: true });
}
