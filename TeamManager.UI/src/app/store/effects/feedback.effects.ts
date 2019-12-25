import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as feedbackActions from '../actions/feedback.actions';
import { switchMap } from 'rxjs/operators';
import { FeedbackService } from 'src/app/feedback/feedback.service';

@Injectable()
export class FeedbackEffects {
    @Effect() getFeedback$: Observable<feedbackActions.GetSuccess> = this.actions$.pipe(
        ofType<feedbackActions.Get>(feedbackActions.FeedbackActionTypes.Get),
        switchMap(a => this.feedbackService.getFeedbackItems(a.payload)),
        switchMap(feedbackItems => of(new feedbackActions.GetSuccess(feedbackItems))));

    constructor(
        private actions$: Actions,
        private feedbackService: FeedbackService
    ) { }
}