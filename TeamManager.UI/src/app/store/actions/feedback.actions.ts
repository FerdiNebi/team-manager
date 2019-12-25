import { Action } from '@ngrx/store';
import { Feedback } from 'src/app/feedback/feedback';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum FeedbackActionTypes {
    Get = '[Feedback] Get',
    GetSuccess = '[Feedback] GetSuccess',
    Add = '[Feedback] Add'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class Get implements Action {
    readonly type = FeedbackActionTypes.Get;

    constructor(public payload: string) { }
}

export class GetSuccess implements Action {
    readonly type = FeedbackActionTypes.GetSuccess;

    constructor(public payload: Feedback[]) { }
}

export class Add implements Action {
    readonly type = FeedbackActionTypes.Add;

    constructor(public payload: Feedback) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type FeedbackActions
                        = Get
                        | Add
                        | GetSuccess;
