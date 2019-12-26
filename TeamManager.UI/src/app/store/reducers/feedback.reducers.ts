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
            if (!action.payload || action.payload.length === 0) {
                return state;
            }

            const personId = action.payload[0].personId;
            action.payload.forEach(f => f.createdOn = new Date(f.createdOn));
            state[personId] = action.payload;
            return state;
        }

        case feedbackActions.FeedbackActionTypes.AddFeedbackSuccess: {
            if (!action.payload) {
                return state;
            }

            action.payload.createdOn = new Date(action.payload.createdOn);
            const personId = action.payload.personId;
            if (!state[personId]) {
                state[personId] = [action.payload];
            } else {
                state[personId] = [action.payload, ...state[personId]];
            }

            return state;
        }

        default: {
            return state;
        }
    }
}