import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feedback } from './feedback';

@Injectable()
export class FeedbackService {
    getFeedbackItems(personId: string) : Observable<Feedback[]> {
        return of([
            {
                personId: personId,
                from: "Ferdi",
                message: "Good job!",
                isOneOnOne: true,
                date: new Date(2019,7,13)
            }
        ])
    }
}