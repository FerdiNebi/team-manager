import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { PeopleService } from './people.service';
import { Person } from './person';
import { FeedbackService } from '../feedback/feedback.service';

declare var $: any

@Component({
    selector: 'people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
    people: Person[];
    calendarContextMenuActions = ['Add feedback', 'Add one-on-one'];

    constructor(private peopleService: PeopleService,
        private feedbackService: FeedbackService) { }

    ngOnInit(): void {
        this.peopleService.getPeople().subscribe(people => this.people = people);
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
