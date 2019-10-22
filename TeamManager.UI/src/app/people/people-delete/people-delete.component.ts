import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Person } from '../person';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app-state';
import { Actions, ofType } from '@ngrx/effects';
import { AddPerson } from 'src/app/store/actions/people.actions';
import * as peopleActions from '../../store/actions/people.actions';

@Component({
  selector: 'people-delete',
  templateUrl: './people-delete.component.html',
  styleUrls: ['./people-delete.component.scss']
})
export class PeopleDeleteComponent implements OnInit {

  @Output() personDeleted = new EventEmitter<string>();
  deleting: boolean = false;
  personToDelete: Person = new Person();
  people$: Observable<Person[]> = this.store.pipe(select(s => s.people));
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<IAppState>, private actions$: Actions) { }

  ngOnInit(): void {
    let subscription = this.actions$.pipe(
      ofType<peopleActions.DeletePersonSuccess>(peopleActions.PeopleActionTypes.DeletePersonSuccess)
    ).subscribe(deleteSuccess => {
      this.deleting = false;
      this.personDeleted.emit(deleteSuccess.payload);
    });

    this.subscriptions.push(subscription);
    this.store.dispatch(new peopleActions.GetPeople());
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

  deletePerson() {
    this.deleting = true;
    this.store.dispatch(new peopleActions.DeletePerson(this.personToDelete));
  }
}
