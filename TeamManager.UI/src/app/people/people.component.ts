import { Component, OnInit } from '@angular/core';
import { Person } from './person';
import { IAppState } from '../store/state/app-state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetPeople } from '../store/actions/people.actions';
import { MsalService } from '@azure/msal-angular';

@Component({
    selector: 'people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
    people$: Observable<Person[]>;
    
    constructor(private authService: MsalService, private store: Store<IAppState>) { }

    ngOnInit(): void {
        this.people$ = this.store.pipe(select(s => s.people));
        this.store.dispatch(new GetPeople());
    }   
}
