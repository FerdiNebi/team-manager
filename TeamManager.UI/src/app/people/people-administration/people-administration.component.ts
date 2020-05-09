import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-people-administration',
  templateUrl: './people-administration.component.html',
  styleUrls: ['./people-administration.component.scss']
})
export class PeopleAdministrationComponent implements OnInit {

  action: string = 'AddPerson';
  constructor(private activatedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams["tab"] === "import") {
      this.action = "ImportFromWorkday";
      this.location.replaceState("/administration");
    }
  }

  personAdded(person) {

  }

  personDeleted(id) {

  }
}
