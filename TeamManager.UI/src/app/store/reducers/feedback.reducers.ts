import { Feedback } from 'src/app/feedback/feedback';
import * as feedbackActions from '../actions/feedback.actions';

export interface State {
    feedback: { [id: string] : Feedback[]; }
};

const initialState: State = {
    feedback: {}  
};

export function feedbackReducer(state = initialState, action: feedbackActions.FeedbackActions ): State {
    switch (action.type) {
        case feedbackActions.FeedbackActionTypes.GetSuccess: {
            if (!action.payload || action.payload.length === 0){
                return state;
            }

            const personId = action.payload[0].personId;
            action.payload.forEach(f => f.createdOn = new Date(f.createdOn));
            state[personId] = action.payload;
            return state;
        }

        default: {
            return state;
        }
    }
}