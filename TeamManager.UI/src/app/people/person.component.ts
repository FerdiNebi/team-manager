import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IAppState } from '../store/state/app-state';
import { Person } from './person';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Feedback, AddFeedbackModel, FeedbackType } from '../feedback/feedback';
import { Get } from '../store/actions/feedback.actions';
import { ModalDialogService } from '../services/modal-dialog.service';

declare var $: any

@Component({
    selector: 'person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy {
    @Input() person: Person;
    feedback$: Observable<Feedback[]> = this.store.pipe(select(s => s.feedback[this.person.id]));
    feedback: Feedback[];
    addFeedbackDialogName = "AddFeedbackDialog";
    addFeedbackModel: AddFeedbackModel;
    addActionName: string;

    calendarContextMenuActions = ['Add feedback', 'Add one-on-one'];
    private feedbackSubscription: Subscription;

    constructor(private store: Store<IAppState>, private modalDialogService: ModalDialogService) { }

    ngOnInit(): void {
        this.store.dispatch(new Get(this.person.id));
        this.feedbackSubscription = this.feedback$.subscribe(f => {
            this.feedback = f;
        });
    }

    ngOnDestroy(): void {
        if (this.feedbackSubscription) {
            this.feedbackSubscription.unsubscribe();
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
        if (added){
            alert(JSON.stringify(this.addFeedbackModel));
        }
        this.modalDialogService.close(this.addFeedbackDialogName);
        this.addFeedbackModel = null;
    }

    showCalendar(person) {
        person.showCalendar = true;
        person.calendarInitialized = true;
    }

    dayRendered(e) {
        debugger;
        if (this.feedback && this.feedback.some(f => f.feedbackType === 0 && this.isSameDay(f.createdOn, e.date))) {
            $(e.element).css('border', '2px solid blue');
        }

        if (this.feedback && this.feedback.some(f => f.feedbackType === 1 && this.isSameDay(f.createdOn, e.date))) {
            $(e.element).css('border', '2px solid red');
        }
    }

    private isSameDay(firstDate: Date, secondDate: Date) {
        return firstDate.getDate() == secondDate.getDate() &&
            firstDate.getMonth() == secondDate.getMonth() &&
            firstDate.getFullYear() == secondDate.getFullYear()
    }
}
