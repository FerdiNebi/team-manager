import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ContentChildren, AfterContentInit, QueryList } from '@angular/core';

@Component({
  selector: 'sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent {
  toggled: boolean = false;

  constructor() { }

  toggle() {
    this.toggled = !this.toggled;
  }
}
