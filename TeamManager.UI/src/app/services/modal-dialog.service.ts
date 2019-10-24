import { Injectable } from '@angular/core';
import { ModalDialog } from './modal-dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {
  private modals: ModalDialog[] = [];

  add(modal: ModalDialog){
    this.modals.push(modal);
  }

  remove(id: string){
    this.modals = this.modals.filter(m => m.id !== id);
  }

  open(id: string){
    const modal = this.modals.find(a => a.id === id);
    if (modal){
      modal.open();
    }
  }

  close(id: string){
    const modal = this.modals.find(a => a.id === id);
    if (modal){
      modal.close();
    }
  }
}
