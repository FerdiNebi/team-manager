import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/state/app-state';
import { Observable } from 'rxjs';
import { Feedback } from '../feedback';
import { Person } from 'src/app/people/person';
import { GetFeedback } from 'src/app/store/actions/feedback.actions';

@Component({
    selector: 'feedback-history',
    templateUrl: './feedback-history.component.html',
    styleUrls: ['./feedback-history.component.scss']
})
export class FeedbackHistoryComponent implements OnInit {
    @Input() person: Person;
    @Input() isVisible: boolean = false;
    feedback$: Observable<Feedback[]> = this.store.pipe(select(s => s.feedback[this.person.id]));

    constructor(private store: Store<IAppState>) { }

    ngOnInit(): void { 
        this.store.dispatch(new GetFeedback(this.person.id)); 
    }
}

