import {FrameLocator, Locator, Page } from "playwright";
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
}
