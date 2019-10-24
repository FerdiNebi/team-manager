import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { ModalDialogService } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit, OnDestroy {

  @Input() id: string;

  constructor(private element: ElementRef, private modalService: ModalDialogService) { }

  ngOnInit() {
    this.modalService.add(this);
    this.element.nativeElement.style.display = 'none';
  }

  open(){
    this.element.nativeElement.style.display = 'block';
  }

  close(){
    this.element.nativeElement.style.display = 'none';
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
  }
}
