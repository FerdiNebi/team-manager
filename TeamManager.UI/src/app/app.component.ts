import { Component } from '@angular/core';
import { PeopleService } from './people/people.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'TeamManagerUI';
  constructor(private peopleService: PeopleService){
    peopleService.getPeople().subscribe(people => {
      this.title = people ? people[0].name : "empty";
    })
  }
}
