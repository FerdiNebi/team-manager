import * as peopleActions from '../actions/people.actions';
import { Person } from 'src/app/people/person';

const initialState: Person[] = [];

export function peopleReducer(state = initialState, action: peopleActions.PeopleActions ): Person[] {
    switch (action.type) {
        case peopleActions.PeopleActionTypes.GetPeopleSuccess: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}