import { expect, Page } from "@playwright/test";

export abstract class BaseAPIService {
    protected readonly page: Page;
    protected abstract readonly endpoint: string;

    constructor(page: Page) {
        this.page = page;
    }

    protected assertRequestPayload(
        expectedPayload: any,
        partial: boolean
    ): Promise<void> {
        let resolveRequest: () => void;
        let rejectRequest: (reason?: any) => void;

        const validationPromise = new Promise<void>((resolve, reject) => {
            resolveRequest = resolve;
            rejectRequest = reject;
        });
        this.page.route(this.endpoint, async (route) => {
            try {
                const actualRequestPayload = await route
                    .request()
                    .postDataJSON();
                if (partial) {
                    console.log(actualRequestPayload);
                    console.log(expectedPayload);
                    expect(actualRequestPayload).toEqual(
                        expect.objectContaining(expectedPayload)
                    );
                } else {
                    expect(actualRequestPayload).toEqual(expectedPayload);
                }
                await route.continue();
                resolveRequest();
            } catch (error) {
                route.fulfill({ status: 500 });
                rejectRequest(error);
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
