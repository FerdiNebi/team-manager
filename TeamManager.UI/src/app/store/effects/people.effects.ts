import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as peopleActions from '../actions/people.actions';
import { PeopleService } from 'src/app/people/people.service';
import { switchMap, map } from 'rxjs/operators';
import { Person } from 'src/app/people/person';

@Injectable()
export class PeopleEffects {
    @Effect() getPeople$: Observable<peopleActions.GetPeopleSuccess> = this.actions$.pipe(
        ofType<peopleActions.GetPeople>(peopleActions.PeopleActionTypes.GetPeople),
        switchMap(() => this.peopleService.getPeople()),
        switchMap(people => of(new peopleActions.GetPeopleSuccess(people)))
        );

    constructor(
        private actions$: Actions,
        private peopleService: PeopleService
    ) {}
}