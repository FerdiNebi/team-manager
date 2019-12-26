import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddFeedbackModel, Feedback } from '../feedback';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app-state';
import { AddFeedback } from 'src/app/store/actions/feedback.actions';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import * as feedbackActions from '../../store/actions/feedback.actions';


@Component({
  selector: 'add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnInit {
  @Input() title: string;
  @Input() addFeedbackModel: AddFeedbackModel;
  @Output() completed: EventEmitter<boolean> = new EventEmitter<boolean>();
  feedbackItem: Feedback;
  private subscription: Subscription;
  private creating: boolean;

  constructor(private store: Store<IAppState>, private actions$: Actions) { }

  ngOnInit() {
    this.feedbackItem = {
      personId: this.addFeedbackModel.personId,
      from: "Me",
      createdOn: this.addFeedbackModel.date,
      feedbackType: this.addFeedbackModel.feedbackType
    }

    this.subscription = this.actions$.pipe(
      ofType(feedbackActions.FeedbackActionTypes.AddFeedbackSuccess)
    ).subscribe(person => {
      this.creating = false;
      this.completed.emit(true);
      this.feedbackItem = null;
    });
  }

  addFeedback(form) {
    this.creating = true;
    this.store.dispatch(new AddFeedback(this.feedbackItem));    
  }

  cancel() {
    this.completed.emit(false);
  }
}
