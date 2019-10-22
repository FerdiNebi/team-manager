import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleAdministrationComponent } from './people-administration.component';

describe('PeopleAdministrationComponent', () => {
  let component: PeopleAdministrationComponent;
  let fixture: ComponentFixture<PeopleAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
