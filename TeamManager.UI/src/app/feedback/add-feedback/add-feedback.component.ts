import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddFeedbackModel, Feedback } from '../feedback';


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

  constructor() { }

  ngOnInit() {
    this.feedbackItem = {
      personId: this.addFeedbackModel.personId,
      from: "Me",
      createdOn: this.addFeedbackModel.date,
      feedbackType: this.addFeedbackModel.feedbackType
    }
  }

  addFeedback(form) {
    this.completed.emit(true);
  }

  cancel() {
    this.completed.emit(false);
  }
}
