import { Person } from './person';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IAppState } from '../store/state/app-state';
import { Store, select } from '@ngrx/store';
import { GetPeople } from '../store/actions/people.actions';
import { first, filter, map } from 'rxjs/operators';

export class PersonResolverService implements Resolve<Person> {
    constructor(private store: Store<IAppState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Person | Observable<Person> | Promise<Person> {
        const id = route.parent.paramMap.get('id');
        const result = this.store.pipe(
            select(s => s.people),
            filter(people => !!people && !!people.filter(p => p.id === id)[0]),
            map(people => people.filter(p => p.id === id)[0]),
            first());

        this.store.dispatch(new GetPeople());

        return result;
    }
}