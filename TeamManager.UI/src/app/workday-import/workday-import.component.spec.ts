import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayImportComponent } from './workday-import.component';

describe('WorkdayImportComponent', () => {
  let component: WorkdayImportComponent;
  let fixture: ComponentFixture<WorkdayImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkdayImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
