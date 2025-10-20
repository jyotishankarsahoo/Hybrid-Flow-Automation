import { expect } from "../utils/test-utilities";
import { FrameLocator, Locator, Page } from "playwright";

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected locator(selector: string): Locator {
        return this.page.locator(selector);
    }
    protected frameLocator(selector: string): FrameLocator {
        return this.page.frameLocator(selector);
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
