import { Action } from '@ngrx/store';
import { Person } from 'src/app/people/person';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum PeopleActionTypes {
    GetPeople = '[People] GetPeople',
    GetPeopleSuccess = '[People] GetPeopleSuccess',
    AddPerson = '[People] AddPerson',
    AddPersonSuccess = '[People] AddPersonSuccess',
    DeletePerson = '[People] DeletePerson',
    DeletePersonSuccess = '[People] DeletePersonSuccess'
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class GetPeople implements Action {
    readonly type = PeopleActionTypes.GetPeople;

    constructor() { }
}

export class GetPeopleSuccess implements Action {
    readonly type = PeopleActionTypes.GetPeopleSuccess;

    constructor(public payload: Person[]) { }
}

export class AddPerson implements Action {
    readonly type = PeopleActionTypes.AddPerson;

    constructor(public payload: string) { }
}

export class AddPersonSuccess implements Action {
    readonly type = PeopleActionTypes.AddPersonSuccess;

    constructor(public payload: Person) { }
}

export class DeletePerson implements Action {
    readonly type = PeopleActionTypes.DeletePerson;

    constructor(public payload: Person) { }
}

export class DeletePersonSuccess implements Action {
    readonly type = PeopleActionTypes.DeletePersonSuccess;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PeopleActions
    = GetPeople
    | GetPeopleSuccess
    | AddPerson
    | AddPersonSuccess
    | DeletePerson
    | DeletePersonSuccess;
