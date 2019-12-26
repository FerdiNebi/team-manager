export interface Feedback {
    id?: string,
    personId?: string;
    fromPersonId?: string;
    from?: string;
    createdOn?: Date;
    content?: string;
    feedbackType?: FeedbackType;
}

export interface AddFeedbackModel{
    date: Date,
    feedbackType: FeedbackType,
    personId: string
}

export enum FeedbackType {
    Feedback,
    OneOnOne
}