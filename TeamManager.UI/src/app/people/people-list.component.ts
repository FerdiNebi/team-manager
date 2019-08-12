import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';
import { Person } from './person';

@Component({
    selector: 'people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
    people: Person[];
    constructor(private service: PeopleService) { }

    ngOnInit(): void {
        this.service.getPeople().subscribe(people => this.people = people);
    }
}
