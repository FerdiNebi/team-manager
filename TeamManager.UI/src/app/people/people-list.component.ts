import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';
import { Person } from './person';

declare var $: any;

@Component({
    selector: 'people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
    people: Person[];
    constructor(private service: PeopleService) { }

    ngOnInit(): void {
        this.service.getPeople().subscribe(people => this.people = people);
    }

    addOneOnOne(event) {

    }

    showCalendar(person) {
        person.showCalendar = true;
        $(`#${person.id}`).calendar({
            enableContextMenu: true,
            clickDay: function (e) {
                alert(JSON.stringify(person) + e.date);
                person.showCalendar = false;
            }
        });
    }
}
