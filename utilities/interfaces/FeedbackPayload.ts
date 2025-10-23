export interface FeedbackRequestPayload {
    rating: number;
    comments: string;
    id: string;
    locale?: string;
    contentType?: string;
}
export type FeedbackResponsePayload =
    | boolean
    | StandardErrorPayload
    | CustomApiErrorPayload
    | SimpleMessageErrorPayload;

export interface FeedbackMockResponseConfig {
    statusCode: number;
    responseBody: any;
    contentType?: string;
}

export interface StandardErrorPayload {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance?: string;
}
export interface CustomApiErrorPayload {
    timestamp: string;
    status: string;
    errorCode: string;
    errorMessage: string;
    traceId: string;
}
export interface SimpleMessageErrorPayload {
    message: string;
}
