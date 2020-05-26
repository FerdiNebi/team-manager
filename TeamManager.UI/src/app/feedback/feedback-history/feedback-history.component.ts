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
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

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
    deleting: boolean;
    content: string = null;
    readonly deleteConfirmationDialogName: string = "delete-feedback-confirmation";
    feedback$: Observable<Feedback[]> = this.store.pipe(select(s => s.feedback[this.person.id]));
    private subscriptions: Subscription[] = [];
    private feedbackToDelete: Feedback = null;

    constructor(private store: Store<IAppState>, private actions$: Actions, private modalService: ModalDialogService) { }

    ngOnInit(): void {
        this.subscriptions.push(this.actions$.pipe(
            ofType(feedbackActions.FeedbackActionTypes.AddFeedbackSuccess)
        ).subscribe(f => {
            this.content = null;
            this.adding = false;
            if (this.scrollToBottomDirective) {
                setTimeout(() => {
                    this.scrollToBottomDirective.scrollToBottom();
                }, 0);
            }
        }));

        this.subscriptions.push(this.actions$.pipe(
            ofType(feedbackActions.FeedbackActionTypes.DeleteFeedbackSuccess)
        ).subscribe(f => {
            this.feedbackToDelete = null;
            this.deleting = false;
            this.modalService.close(this.deleteConfirmationDialogName);
        }));
    }

    addFeedback() {
        this.addItem(FeedbackType.Feedback);
    }

    addOneOnOne() {
        this.addItem(FeedbackType.OneOnOne);
    }

    deleteFeedback(feedbackItem: Feedback) {
        this.feedbackToDelete = feedbackItem;
        this.modalService.open(this.deleteConfirmationDialogName);
    }

    confirmDeleteFeedback() {
        if (this.feedbackToDelete) {
            this.deleting = true;
            this.store.dispatch(new feedbackActions.DeleteFeedback(this.feedbackToDelete.id));
        }
    }

    cancel() {
        this.modalService.close(this.deleteConfirmationDialogName);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
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

