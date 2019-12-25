export interface Feedback {
    id?: string,
    personId?: string;
    fromPersonId?: string;
    from?: string;
    createdOn?: Date;
    content?: string;
    feedbackType?: number;
}