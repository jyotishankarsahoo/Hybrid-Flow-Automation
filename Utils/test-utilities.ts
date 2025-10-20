import { Page, test as base_test, expect, TestInfo } from "@playwright/test";

export const test = base_test.extend({
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
});

export { expect, test as describe };
