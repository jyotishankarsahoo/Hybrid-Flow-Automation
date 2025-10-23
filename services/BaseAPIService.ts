import { expect, Page } from "@playwright/test";
import { FeedbackMockResponseConfig } from "../utilities/interfaces/FeedbackPayload";

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
    protected modifyRequestPayload(updatedPayload: any): Promise<void> {
        let resolveModification: () => void;
        let rejectModification: (reason?: any) => void;

        const modificationPromise = new Promise<void>((resolve, reject) => {
            resolveModification = resolve;
            rejectModification = reject;
        });

        this.page.route(this.endpoint, async (route) => {
            try {
                const modifiedRequest = route.request().postDataJSON();
                const newRequestPayload = {
                    ...modifiedRequest,
                    ...updatedPayload,
                };
                // await route.continue({
                //     postData: JSON.stringify(newRequestPayload),
                // });
                const response = await route.fetch({
                    postData: JSON.stringify(newRequestPayload),
                });

                // 3. Log and Observe the Response (The new functionality)
                const status = response.status();
                // Safely parse response body (using .text() is safer than .json() for simple responses)
                const responseBodyText = await response.text();

                console.log("--- MODIFIED REQUEST TRANSACTION LOG ---");
                console.log(
                    `SENT PAYLOAD: ${JSON.stringify(newRequestPayload)}`
                );
                console.log(`RESPONSE URL: ${route.request().url()}`);
                console.log(`RESPONSE STATUS: ${status}`);
                console.log(`RESPONSE BODY: ${responseBodyText}`);
                console.log("----------------------------------------");
                resolveModification();
            } catch (error) {
                route.fulfill({ status: 500 });
                rejectModification(error);
            }
        });
        return modificationPromise;
    }
    protected mockErrorResponse(
        config: FeedbackMockResponseConfig
    ): Promise<void> {
        let resolveMock: () => void;
        const mockPromise = new Promise<void>((resolve) => {
            resolveMock = resolve;
        });
        this.page.route(this.endpoint, async (route) => {
            route.fulfill({
                status: config.statusCode,
                contentType: config.contentType || "application/json",
                body: JSON.stringify(config.responseBody),
            });
            resolveMock();
        });
        return mockPromise;
    }
    
    public async cleanupRoutes(): Promise<void> {
        await this.page.unrouteAll();
    }
}
