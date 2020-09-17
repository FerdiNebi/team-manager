import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  importing = false;
  private importedPeopleCount = 0;
  private totalPeopleToImport = 0;
  private feedbackList: any[];
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

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
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const arrayBuffer = fileReader.result as ArrayBuffer;
      let data = new Uint8Array(arrayBuffer);
      let arr = new Array();
      for (let i = 0; i != data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
      let bstr = arr.join('');
      let workbook = XLSX.read(bstr, { type: 'binary' });
      let first_sheet_name = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[first_sheet_name];
      const range = worksheet['A2'] ? 'A2:J10000' : 'A3:J10000';
      this.feedbackList = XLSX.utils.sheet_to_json(worksheet, { range });
    };
  }

  import() {
    this.importing = true;
    this.fileInput.nativeElement.value = null;
    this.importedPeopleCount = 0;
    this.store.pipe(select(s => s.people), first()).subscribe(people => {
      const peopleIdsByName: { [key: string]: string } = {};
      if (people) {
        for (const person of people) {
          peopleIdsByName[person.name] = person.id;
        }
      }

      for (let i = 0; i < this.feedbackList.length; i++) {
        const feedback = this.feedbackList[i];
        const personName = feedback['About'];
        if (personName && !peopleIdsByName[personName]) {
          this.store.dispatch(new peopleActions.AddPerson(personName));
          peopleIdsByName[personName] = '1';
        }
      }

      this.totalPeopleToImport = Object.keys(peopleIdsByName).length;
      if (people) {
        setTimeout(() => {
          for (const person of people) {
            this.importFeedbackForPerson(person);
          }
        }, 0);
      }
    });
  }

  private importFeedbackForPerson(person: Person) {
    if (!this.feedbackList) {
      return;
    }

    let batchFeedback: Feedback[] = [];
    for (let i = 0; i < this.feedbackList.length; i++) {
      const feedback = this.feedbackList[i];
      if (feedback['About'] == person.name && feedback['Feedback'] && !this.isPoll(feedback['Question'])) {
        const dateObj = XLSX.SSF.parse_date_code(feedback['Date']);

        const feedbackItem = {
          personId: person.id,
          from: feedback['From'],
          createdOn: new Date(dateObj.y, dateObj.m - 1, dateObj.d, dateObj.H, dateObj.M, dateObj.S),
          content: 'Q: ' + feedback['Question'] + '\n\nA: ' + feedback['Feedback'],
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

    this.importedPeopleCount++;
    if (this.totalPeopleToImport === this.importedPeopleCount) {
      this.feedbackList = null;
      this.importing = false;
    }
  }

  private isPoll(question: string): boolean {
    const isPoll = question && question.indexOf('1. ') !== -1 && question.indexOf('2. ') !== -1 && question.indexOf('3. ') !== -1;
    return isPoll;
  }
}
