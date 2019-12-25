import { Person } from 'src/app/people/person';
import { Feedback } from 'src/app/feedback/feedback';

export interface IAppState {
    people: Person[];
    feedback: { [id: string]: Feedback[]; };
}