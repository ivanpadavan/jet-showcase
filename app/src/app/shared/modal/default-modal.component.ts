import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-default-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left"><ng-content select=".modal-title"></ng-content></h4>
      <button type="button" class="close pull-right" style="outline: none" aria-label="Close" (click)="modalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="m-3">
      <ng-content></ng-content>
    </div>

  `
})
export class DefaultModalComponent {
  constructor(public modalRef: BsModalRef) {
  }
}


@NgModule({
  imports: [CommonModule],
  declarations: [DefaultModalComponent],
  exports: [DefaultModalComponent],
})
export class DefaultModalModule {
}


