import { Action } from '@ngrx/store';
import { Feedback } from 'src/app/feedback/feedback';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum FeedbackActionTypes {
    GetFeedback = '[Feedback] Get',
    GetFeedbackSuccess = '[Feedback] GetSuccess',
    AddFeedback = '[Feedback] Add',
    AddFeedbackSuccess = '[Feedbac] AddSuccess',
    AddBatchFeedback = '[Feedback] Add Batch',
    DeleteFeedback = '[Feedback] Delete',
    DeleteFeedbackSuccess = '[Feedback] DeleteSuccess'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class GetFeedback implements Action {
    readonly type = FeedbackActionTypes.GetFeedback;

    constructor(public payload: string) { }
}

export class GetFeedbackSuccess implements Action {
    readonly type = FeedbackActionTypes.GetFeedbackSuccess;

    constructor(public personId: string, public payload: Feedback[]) { }
}

export class AddFeedback implements Action {
    readonly type = FeedbackActionTypes.AddFeedback;

    constructor(public payload: Feedback) { }
}

export class AddFeedbackSuccess implements Action {
    readonly type = FeedbackActionTypes.AddFeedbackSuccess;

    constructor(public payload: Feedback) { }
}

export class AddBatchFeedback implements Action {
    readonly type = FeedbackActionTypes.AddBatchFeedback;

    constructor(public payload: Feedback[]) { }
}

export class DeleteFeedback implements Action {
    readonly type = FeedbackActionTypes.DeleteFeedback;

    constructor(public feedbackId: string) { }
}

export class DeleteFeedbackSuccess implements Action {
    readonly type = FeedbackActionTypes.DeleteFeedbackSuccess;

    constructor(public feedbackId: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FeedbackActions
    = GetFeedback
    | AddFeedback
    | GetFeedbackSuccess
    | AddFeedbackSuccess
    | AddBatchFeedback
    | DeleteFeedback
    | DeleteFeedbackSuccess;
