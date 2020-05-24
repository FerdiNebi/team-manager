import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from './person';
import { IAppState } from '../store/state/app-state';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { GetPeople } from '../store/actions/people.actions';
import { MsalService } from '@azure/msal-angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {
    people$: Observable<Person[]>;
    loading: boolean = false;
    private subscription: Subscription;

    constructor(private authService: MsalService, private store: Store<IAppState>, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.people$ = this.store.pipe(select(s => s.people));
        this.store.dispatch(new GetPeople());
        this.subscription = this.people$.subscribe((people) => {
            this.loading = !people;
            if (people && people.length && !this.route.snapshot.paramMap.get('id')) {
                this.router.navigate([people[0].id], {relativeTo: this.route});
            }
        })
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
