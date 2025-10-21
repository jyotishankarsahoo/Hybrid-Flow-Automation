import * as path from "path";
import { Page, TestInfo } from "@playwright/test";
import * as fs from "fs";
/**
 * Takes a screenshot of the page if the test has failed.
 */
export async function takeScreenshotIfFailed(page: Page, testInfo: TestInfo) {
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
