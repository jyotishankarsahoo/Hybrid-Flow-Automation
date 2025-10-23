export interface FeedbackRequestPayload {
    rating: number;
    comments: string;
    id: string;
    locale?: string;
    contentType?: string;
}
export type FeedbackResponsePayload = boolean;

export interface FeedbackMockResponseConfig {
    statusCode: number;
    responseBody: any;
    contentType?: string;
}
