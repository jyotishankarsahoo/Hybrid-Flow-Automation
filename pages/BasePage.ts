import { expect } from "../Utils/test-utilities";
import { FrameLocator, Locator, Page } from "playwright";

export class BasePage {
    protected static page: Page;
    // Static Pattern
    constructor(page: Page) {
        BasePage.page = page;
    }

    public static setPage(page: Page) {
        BasePage.page = page;
    }

    protected locator(selector: string): Locator {
        return BasePage.page.locator(selector);
    }
    protected frameLocator(selector: string): FrameLocator {
        return BasePage.page.frameLocator(selector);
    }
    protected async clickElement(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
        await expect(locator).toBeEnabled();
        await locator.click();
    }
    protected async fillField(locator: Locator, text: string): Promise<void> {
        await expect(locator).toBeEditable();
        await locator.fill(text);
    }
}
