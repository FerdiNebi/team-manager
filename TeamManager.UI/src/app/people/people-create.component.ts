import { Component } from '@angular/core';
import { PeopleService } from './people.service';
import { Person } from './person';
import { Router } from '@angular/router';

@Component({
    selector: 'people-create',
    templateUrl: './people-create.component.html',
    styleUrls: ['./people-create.component.scss']
})
export class PeopleCreateComponent {
    constructor(private service: PeopleService, private router: Router) { }
    creating: boolean = false;
    model: Person = new Person();

    addPerson() {
        this.creating = true;
        this.service.addPerson(this.model.name).subscribe(() =>{
            this.router.navigate(['people']);
            this.creating = false;
        });
    }
}
