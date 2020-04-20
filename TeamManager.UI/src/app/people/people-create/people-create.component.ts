import { Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { PeopleService } from './../people.service';
import { Person } from './../person';
import { Router } from '@angular/router';
import { IAppState } from '../../store/state/app-state';
import { Store } from '@ngrx/store';
import { AddPerson } from '../../store/actions/people.actions';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import * as peopleActions from '../../store/actions/people.actions';

@Component({
    selector: 'people-create',
    templateUrl: './people-create.component.html',
    styleUrls: ['./people-create.component.scss']
})
export class PeopleCreateComponent implements OnInit, OnDestroy {
    @Output() personAdded = new EventEmitter<Person>();
    creating: boolean = false;
    model: Person = new Person();
    private subscription: Subscription;

    constructor(private store: Store<IAppState>, private actions$: Actions) { }

    ngOnInit(): void {
        this.subscription = this.actions$.pipe(
            ofType<peopleActions.AddPersonSuccess>(peopleActions.PeopleActionTypes.AddPersonSuccess)
        ).subscribe(action => {
            this.creating = false;
            this.personAdded.emit(action.payload);
            this.model = new Person();
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    addPerson() {
        this.creating = true;
        this.store.dispatch(new AddPerson(this.model.name));
    }
}
