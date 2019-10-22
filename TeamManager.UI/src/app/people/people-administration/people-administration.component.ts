import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people-administration',
  templateUrl: './people-administration.component.html',
  styleUrls: ['./people-administration.component.scss']
})
export class PeopleAdministrationComponent implements OnInit {

  action: string = 'AddPerson';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  personAdded(person) {
    
  }

  personDeleted(id) {

  }
}
