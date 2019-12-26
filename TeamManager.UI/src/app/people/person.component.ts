import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IAppState } from '../store/state/app-state';
import { Person } from './person';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Feedback, AddFeedbackModel, FeedbackType } from '../feedback/feedback';
import { GetFeedback } from '../store/actions/feedback.actions';
import { ModalDialogService } from '../services/modal-dialog.service';

declare var $: any

@Component({
    selector: 'person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy {
    private _person: Person;
    @Input()
    set person(person: Person) {
        this.addFeedbackDialogName = "AddFeedbackDialog" + person.id;
        this._person = person;
    }

    get person(): Person {
        return this._person;
    }

    feedback$: Observable<Feedback[]> = this.store.pipe(select(s => s.feedback[this.person.id]));
    addFeedbackDialogName: string;
    addFeedbackModel: AddFeedbackModel;
    addActionName: string;

    calendarContextMenuActions = ['Add feedback', 'Add one-on-one'];
    private subscriptions: Subscription[] = [];

    constructor(private store: Store<IAppState>, private modalDialogService: ModalDialogService) { }

    ngOnInit(): void {
        this.store.dispatch(new GetFeedback(this.person.id));
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

    showCalendar(person) {
        person.showCalendar = true;
        person.calendarInitialized = true;
    }

    dayRendered(e) {
        var that = this;
        function updateCalendarFunction() {
            var element = e.element;
            var date = new Date(e.date);
            return function (feedback) {
                if (feedback && feedback.some(f => f.feedbackType === 0 && that.isSameDay(f.createdOn, date))) {
                    $(element).css('border', '2px solid blue');
                }

                if (feedback && feedback.some(f => f.feedbackType === 1 && that.isSameDay(f.createdOn, date))) {
                    $(element).css('border', '2px solid red');
                }
            };
        }

        const subscription = this.feedback$.subscribe(updateCalendarFunction());
        this.subscriptions.push(subscription);
    }

    private isSameDay(firstDate: Date, secondDate: Date) {
        return firstDate.getDate() == secondDate.getDate() &&
            firstDate.getMonth() == secondDate.getMonth() &&
            firstDate.getFullYear() == secondDate.getFullYear()
    }
}
