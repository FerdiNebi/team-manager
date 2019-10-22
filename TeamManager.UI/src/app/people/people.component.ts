import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { PeopleService } from './people.service';
import { Person } from './person';
import { FeedbackService } from '../feedback/feedback.service';
import { IAppState } from '../store/state/app-state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetPeople } from '../store/actions/people.actions';

declare var $: any

@Component({
    selector: 'people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
    people$: Observable<Person[]> = this.store.pipe(select(s => s.people));
    calendarContextMenuActions = ['Add feedback', 'Add one-on-one'];

    constructor(private store: Store<IAppState>,
        private feedbackService: FeedbackService) { }

    ngOnInit(): void {
        this.store.dispatch(new GetPeople());
    }

    onContextMenuActionClicked(e) {
        alert(JSON.stringify(e));
        debugger;
    }

    showCalendar(person) {
        person.showCalendar = true;
        person.calendarInitialized = true;
    }

    dayRendered(e){
        if (this.isToday(e.date)) {
            $(e.element).css('border', '2px solid red');
        }
    }

    private isToday(someDate) {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    }
}
