import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as feedbackActions from '../actions/feedback.actions';
import { switchMap, flatMap, map, catchError } from 'rxjs/operators';
import { FeedbackService } from 'src/app/feedback/feedback.service';

@Injectable()
export class FeedbackEffects {
    @Effect() getFeedback$: Observable<feedbackActions.GetFeedbackSuccess> = this.actions$.pipe(
        ofType<feedbackActions.GetFeedback>(feedbackActions.FeedbackActionTypes.GetFeedback),
        flatMap(a => zip(of(a.payload), this.feedbackService.getFeedbackItems(a.payload))),
        flatMap(obj => of(new feedbackActions.GetFeedbackSuccess(obj[0], obj[1])))
    );

    @Effect() addFeedback$: Observable<feedbackActions.AddFeedbackSuccess> = this.actions$.pipe(
        ofType<feedbackActions.AddFeedback>(feedbackActions.FeedbackActionTypes.AddFeedback),
        flatMap(a => this.feedbackService.addFeedback(a.payload).pipe(catchError(err => of(null)))),
        flatMap(feedbackItem => of(new feedbackActions.AddFeedbackSuccess(feedbackItem)))
    );

    @Effect() addBatchFeedback$: Observable<feedbackActions.AddFeedbackSuccess> = this.actions$.pipe(
        ofType<feedbackActions.AddBatchFeedback>(feedbackActions.FeedbackActionTypes.AddBatchFeedback),
        flatMap(a => this.feedbackService.addBatchFeedback(a.payload)),
        flatMap(feedbackItem => of(new feedbackActions.AddFeedbackSuccess(feedbackItem)))
    );

    @Effect() deleteFeedback$: Observable<feedbackActions.DeleteFeedbackSuccess> = this.actions$.pipe(
        ofType<feedbackActions.DeleteFeedback>(feedbackActions.FeedbackActionTypes.DeleteFeedback),
        flatMap(a => this.feedbackService.deleteFeedback(a.feedbackId).pipe(map(r => a.feedbackId))),
        flatMap(feedbackId => of (new feedbackActions.DeleteFeedbackSuccess(feedbackId)))
    )

    constructor(
        private actions$: Actions,
        private feedbackService: FeedbackService
    ) { }
}