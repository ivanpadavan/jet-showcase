import { Component, EventEmitter, Output } from '@angular/core';
import { NavbarContentService } from './navbar-content.service';

@Component({
  selector: 'app-navbar',
  template: `
    <ng-container *ngIf="(navbarContent.template$ | async) as template; else widthStub">
      <ng-template [ngTemplateOutlet]="template"></ng-template>
    </ng-container>
    <ng-template #widthStub>
      <div class="w-100"></div>
    </ng-template>
    <ng-content></ng-content>
  `,
})
export class NavbarComponent {
  constructor(public navbarContent: NavbarContentService) {
  }
}
