import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state/app-state';
import { Observable, Subscription } from 'rxjs';
import { Feedback, FeedbackType } from '../feedback';
import { Person } from 'src/app/people/person';
import { GetFeedback, AddFeedback } from 'src/app/store/actions/feedback.actions';
import { Actions, ofType } from '@ngrx/effects';
import * as feedbackActions from '../../store/actions/feedback.actions';
import { ScrollToBottomDirective } from 'src/app/shared/scroll-to-bottom.directive';

@Component({
    selector: 'feedback-history',
    templateUrl: './feedback-history.component.html',
    styleUrls: ['./feedback-history.component.scss']
})
export class FeedbackHistoryComponent implements OnInit, OnDestroy {
    @Input() person: Person;
    @Input() isVisible: boolean = false;
    @ViewChild(ScrollToBottomDirective, { static: false }) scrollToBottomDirective: ScrollToBottomDirective;
    adding: boolean;
    content: string = null;
    feedback$: Observable<Feedback[]> = this.store.pipe(select(s => s.feedback[this.person.id]));
    private subscription: Subscription;

    constructor(private store: Store<IAppState>, private actions$: Actions) { }

    ngOnInit(): void {
        this.store.dispatch(new GetFeedback(this.person.id));
        this.subscription = this.actions$.pipe(
            ofType(feedbackActions.FeedbackActionTypes.AddFeedbackSuccess)
        ).subscribe(f => {
            this.content = null;
            this.adding = false;
            debugger;
            if (this.scrollToBottomDirective) {
                setTimeout(() => {
                    this.scrollToBottomDirective.scrollToBottom();
                }, 0);
            }
        });
    }

    addFeedback() {
        this.addItem(FeedbackType.Feedback);
    }

    addOneOnOne() {
        this.addItem(FeedbackType.OneOnOne);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private addItem(type: FeedbackType) {
        this.adding = true;
        const feedbackItem: Feedback = {
            personId: this.person.id,
            from: "Me",
            createdOn: new Date(),
            feedbackType: type,
            content: this.content
        };

        this.store.dispatch(new AddFeedback(feedbackItem));
    }
}

