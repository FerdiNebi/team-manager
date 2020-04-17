import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as peopleActions from '../actions/people.actions';
import { PeopleService } from 'src/app/people/people.service';
import { switchMap, map, flatMap } from 'rxjs/operators';
import { Person } from 'src/app/people/person';

@Injectable()
export class PeopleEffects {
    @Effect() getPeople$: Observable<peopleActions.GetPeopleSuccess> = this.actions$.pipe(
        ofType<peopleActions.GetPeople>(peopleActions.PeopleActionTypes.GetPeople),
        switchMap(() => this.peopleService.getPeople()),
        switchMap(people => of(new peopleActions.GetPeopleSuccess(people)))
        );

    @Effect() addPerson$ = this.actions$.pipe(
        ofType<peopleActions.AddPerson>(peopleActions.PeopleActionTypes.AddPerson),
        flatMap(a => this.peopleService.addPerson(a.payload)),
        flatMap((r:any) => of(new peopleActions.AddPersonSuccess(r)))
    );

    @Effect() deletePerson$ = this.actions$.pipe(
        ofType<peopleActions.DeletePerson>(peopleActions.PeopleActionTypes.DeletePerson),
        flatMap(a => this.peopleService.removePerson(a.payload.id).pipe(map(r => a.payload.id))),
        flatMap(p => of(new peopleActions.DeletePersonSuccess(p)))
    );

    constructor(
        private actions$: Actions,
        private peopleService: PeopleService
    ) {}
}