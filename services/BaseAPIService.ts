import { expect, Page } from "@playwright/test";

export abstract class BaseAPIService {
    protected readonly page: Page;
    protected abstract readonly endpoint: string;

    constructor(page: Page) {
        this.page = page;
    }

    protected assertRequestPayload(expectedPayload: any): Promise<void> {
        let resolveRequest: () => void;
        const validationPromise = new Promise<void>((resolve) => {
            resolveRequest = resolve;
        });
        this.page.route(this.endpoint, async (route) => {
            try {
                const actualRequestPayload = route.request().postDataJSON();
                expect(actualRequestPayload).toEqual(expectedPayload);
                await route.continue();
                resolveRequest();
            } catch (error) {
                route.fulfill({ status: 500 });
            }
        });
        return validationPromise;
    }

    protected assertResponsePayload(expectedPayload: any): Promise<void> {
        let resolveResponse: () => void;
        const validationPromise = new Promise<void>((resolve) => {
            resolveResponse = resolve;
        });
        this.page.route(this.endpoint, async (route) => {
            const response = await route.fetch();
            const actualResponsePayload = await response.json();
            expect(actualResponsePayload).toEqual(expectedPayload);
            await route.fulfill({ response });
        });
        return validationPromise;
    }

    public async cleanupRoutes(): Promise<void> {
        await this.page.unrouteAll();
    }
}
