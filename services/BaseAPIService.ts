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
        let rejectResponse: (reason?: any) => void;
        const validationPromise = new Promise<void>((resolve, reject) => {
            resolveResponse = resolve;
            rejectResponse = reject;
        });
        this.page.route(this.endpoint, async (route) => {
            try {
                const response = await route.fetch();
                const actualResponsePayload = await response.json();
                console.log(actualResponsePayload);
                console.log(expectedPayload);

                expect(actualResponsePayload).toEqual(expectedPayload);
                await route.fulfill({ response });
                resolveResponse();
            } catch (error) {
                await route.fulfill({ status: 500 });
                rejectResponse(error);
            }
        });
        return validationPromise;
    }

    public async cleanupRoutes(): Promise<void> {
        await this.page.unrouteAll();
    }
}
