import { BaseAPIService } from "./BaseAPIService";
import {
    FeedbackRequestPayload,
    FeedbackResponsePayload,
    FeedbackMockResponseConfig,
} from "../utilities/interfaces/FeedbackPayload";
export class FeedbackAPIService extends BaseAPIService {
    protected readonly endpoint: string = "**/realtimeapi/ratings";

    public assertRequest(
        expectedPayload: FeedbackRequestPayload,
        partial: boolean
    ): Promise<void> {
        return this.assertRequestPayload(expectedPayload, partial);
    }
    public assertResponse(
        expectedPayload: FeedbackResponsePayload
    ): Promise<void> {
        return this.assertResponsePayload(expectedPayload);
    }

    public modifyRequest(
        payload: Partial<FeedbackRequestPayload>,
        responsePayload: Partial<FeedbackResponsePayload>
    ): Promise<void> {
        return this.modifyRequestAssertResponse(payload, responsePayload);
    }

    public mockResponse(config: FeedbackMockResponseConfig): Promise<void> {
        return this.mockErrorResponse(config);
    }
}
