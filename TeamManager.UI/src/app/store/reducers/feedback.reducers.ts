import { Feedback } from 'src/app/feedback/feedback';
import * as feedbackActions from '../actions/feedback.actions';

export interface State {
    [id: string]: Feedback[];
};

const initialState: State = {
};

export function feedbackReducer(state = initialState, action: feedbackActions.FeedbackActions): State {
    switch (action.type) {
        case feedbackActions.FeedbackActionTypes.GetFeedbackSuccess: {
            if (!action.payload) {
                return state;
            }

            const personId = action.personId;
            action.payload.forEach(f => f.createdOn = new Date(f.createdOn));
            state[personId] = action.payload;
            return state;
        }

        case feedbackActions.FeedbackActionTypes.AddFeedbackSuccess: {
            if (!action.payload) {
                return state;
            }

            const newState = duplicateState(state);
            action.payload.createdOn = new Date(action.payload.createdOn);
            const personId = action.payload.personId;
            if (!newState[personId]) {
                newState[personId] = [action.payload];
            } else {
                let index = newState[personId].length;
                for (let i = 0; i < newState[personId].length; i++) {
                    if (newState[personId][i].createdOn > action.payload.createdOn) {
                        index = i;
                        break;
                    }
                }

                newState[personId].splice(index, 0, action.payload);
            }

            return newState;
        }

        default: {
            return state;
        }
    }
}

function duplicateState(state: State): State {
    const newState:State = {};
    for (const key in state) {
        if (state.hasOwnProperty(key)) {
            newState[key] = [...state[key]];            
        }
    }

    return newState;
}