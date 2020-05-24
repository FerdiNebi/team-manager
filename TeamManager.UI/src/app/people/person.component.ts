import { Component, OnInit, Input, OnDestroy, ElementRef } from '@angular/core';
import { IAppState } from '../store/state/app-state';
import { Person } from './person';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, interval } from 'rxjs';
import { Feedback, AddFeedbackModel, FeedbackType } from '../feedback/feedback';
import { GetFeedback } from '../store/actions/feedback.actions';
import { ModalDialogService } from '../services/modal-dialog.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

declare var $: any
const CALENDAR_TAB_NAME = "calendar";
const FEEDBACK_TAB_NAME = "feedback";

@Component({
    selector: 'person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy {
    feedback$: Observable<Feedback[]>;
    addFeedbackDialogName: string;
    addFeedbackModel: AddFeedbackModel;
    addActionName: string;
    calendarInitialized: boolean;
    detailsVisible: boolean;
    currentTab: string = CALENDAR_TAB_NAME;
    person: Person;

    calendarContextMenuActions = ['Add feedback', 'Add one-on-one'];
    private subscriptions: Subscription[] = [];

    constructor(private store: Store<IAppState>, private modalDialogService: ModalDialogService, private element: ElementRef, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data
            .subscribe((data: { person: Person }) => {
                this.person = null;
                setTimeout(() => {
                    this.person = data.person;
                    this.addFeedbackDialogName = "AddFeedbackDialog" + this.person.id;
                    this.feedback$ = this.store.pipe(select(s => s.feedback[this.person.id]));
                    this.store.dispatch(new GetFeedback(this.person.id));
                }, 0);
            });
    }

    ngOnDestroy(): void {
        for (let i = 0; i < this.subscriptions.length; i++) {
            const subscription = this.subscriptions[i];
            subscription.unsubscribe();
        }
    }

    onContextMenuActionClicked(e) {
        this.addActionName = e.action;
        this.addFeedbackModel = {
            date: e.data.date,
            feedbackType: e.action !== this.calendarContextMenuActions[1] ? FeedbackType.Feedback : FeedbackType.OneOnOne,
            personId: e.data.person.id
        };

        this.modalDialogService.open(this.addFeedbackDialogName);
    }

    addFeedbackCompleted(added: boolean) {
        this.modalDialogService.close(this.addFeedbackDialogName);
        this.addFeedbackModel = null;
    }

    dayRendered(e) {
        var that = this;
        function updateCalendarFunction() {
            var element = e.element;
            var date = new Date(e.date);
            return function (feedback) {
                let updated = false;
                if (feedback && feedback.some(f => f.feedbackType === 0 && that.isSameDay(f.createdOn, date))) {
                    $(element).css('border', '2px solid blue');
                    updated = true;
                }

                if (feedback && feedback.some(f => f.feedbackType === 1 && that.isSameDay(f.createdOn, date))) {
                    $(element).css('border', '2px solid red');
                    updated = true;
                }

                if (!updated) {
                    $(element).css('border', '0px');
                }
            };
        }

        const subscription = this.feedback$.subscribe(updateCalendarFunction());
        this.subscriptions.push(subscription);
    }

    changeTab(tab: string) {
        this.currentTab = tab;
    }

    isCalendarTabActive() {
        return this.currentTab === CALENDAR_TAB_NAME;
    }

    isFeedbackTabActive() {
        return this.currentTab === FEEDBACK_TAB_NAME;
    }

    private isSameDay(firstDate: Date, secondDate: Date) {
        return firstDate.getDate() == secondDate.getDate() &&
            firstDate.getMonth() == secondDate.getMonth() &&
            firstDate.getFullYear() == secondDate.getFullYear()
    }
}
