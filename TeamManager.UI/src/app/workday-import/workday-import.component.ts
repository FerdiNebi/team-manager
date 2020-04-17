import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../store/state/app-state';
import { first } from 'rxjs/operators';
import * as peopleActions from '../store/actions/people.actions';
import { Actions, ofType } from '@ngrx/effects';
import { AddFeedback, AddBatchFeedback } from '../store/actions/feedback.actions';
import { Person } from '../people/person';
import { FeedbackType, Feedback } from '../feedback/feedback';

@Component({
  selector: 'workday-import',
  templateUrl: './workday-import.component.html',
  styleUrls: ['./workday-import.component.scss']
})
export class WorkdayImportComponent implements OnInit {

  private feedbackList: any[];
  constructor(private store: Store<IAppState>, private actions$: Actions) { }

  ngOnInit() {
    this.actions$.pipe(
      // untilDestroyed(this),
      ofType<peopleActions.AddPersonSuccess>(peopleActions.PeopleActionTypes.AddPersonSuccess)
    ).subscribe(action => {
      this.importFeedbackForPerson(action.payload);
    });
  }

  addfile(event) {
    const file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const arrayBuffer = fileReader.result as ArrayBuffer;
      var data = new Uint8Array(arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.feedbackList = XLSX.utils.sheet_to_json(worksheet, { range: "A3:J10000" });
    }
  }

  import() {
    this.store.pipe(select(s => s.people), first()).subscribe(people => {
      const peopleIdsByName: { [key: string]: string } = {};
      if (people) {
        for (const person of people) {
          peopleIdsByName[person.name] = person.id;
        }
      }

      for (let i = 0; i < this.feedbackList.length; i++) {
        const feedback = this.feedbackList[i];
        const personName = feedback["About"];
        if (personName && !peopleIdsByName[personName]) {
          this.store.dispatch(new peopleActions.AddPerson(personName));
          peopleIdsByName[personName] = "1";
        }
      }

      if (people) {
        for (const person of people) {
          this.importFeedbackForPerson(person);
        }
      }
    });
  }

  private importFeedbackForPerson(person: Person) {
    let batchFeedback: Feedback[] = [];
    for (let i = 0; i < this.feedbackList.length; i++) {
      const feedback = this.feedbackList[i];
      if (feedback["About"] == person.name && feedback["Feedback"] && !this.isPoll(feedback["Question"])) {
        const dateObj = XLSX.SSF.parse_date_code(feedback["Date"]);

        const feedbackItem = {
          personId: person.id,
          from: feedback["From"],
          createdOn: new Date(dateObj.y, dateObj.m - 1, dateObj.d, dateObj.H, dateObj.M, dateObj.S),
          content: "Q: " + feedback["Question"] + "\n\nA: " + feedback["Feedback"],
          feedbackType: FeedbackType.Feedback
        };

        batchFeedback.push(feedbackItem);
      }

      if (i % 20 === 0) {
        if (batchFeedback.length > 0) {
          this.store.dispatch(new AddBatchFeedback(batchFeedback));
          batchFeedback = [];
        }
      }
    }

    if (batchFeedback.length > 0) {
      this.store.dispatch(new AddBatchFeedback(batchFeedback));
    }
  }

  private isPoll(question: string): boolean {
    const isPoll = question && question.indexOf("1. ") !== -1 && question.indexOf("2. ") !== -1 && question.indexOf("3. ") !== -1;
    return isPoll;
  }
}
