import * as peopleActions from '../actions/people.actions';
import { Person } from 'src/app/people/person';

const initialState: Person[] = null;

export function peopleReducer(state = initialState, action: peopleActions.PeopleActions): Person[] {
    switch (action.type) {
        case peopleActions.PeopleActionTypes.GetPeopleSuccess: {
            return action.payload;
        }
        case peopleActions.PeopleActionTypes.AddPersonSuccess: {
            if (state) {
                return [action.payload, ...state];
            }
            
            return [action.payload];
        }
        case peopleActions.PeopleActionTypes.DeletePersonSuccess: {
            if (state) {
                return state.filter(p => p.id !== action.payload);
            }

            return state;
        }
        default: {
            return state;
        }
    }
}