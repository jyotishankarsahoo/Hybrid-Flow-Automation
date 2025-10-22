import { BaseAPIService } from "./BaseAPIService";
interface FeedbackRequestPayload {
    rating: number;
    comments: string | null;
    articleId: string;
}
interface FeedbackResponsePayload {
    status: "Success" | "Failure";
    confirmationId: number;
}

export class FeedbackAPIService extends BaseAPIService {
    protected readonly endpoint: string = "**/realtimeapi/ratings";
    public assertRequest(
        expectedPayload: FeedbackRequestPayload
    ): Promise<void> {
        return this.assertRequestPayload(expectedPayload);
    }
    public assertResponse(
        expectedPayload: FeedbackResponsePayload
    ): Promise<void> {
        return this.assertResponsePayload(expectedPayload);
    }
}
