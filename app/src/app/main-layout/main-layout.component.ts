import { Component } from '@angular/core';
import { fadeAnimation } from '../shared/animations/fade.animation';

@Component({
  selector: 'app-main-layout',
  template: `
    <app-navbar></app-navbar>
    <div class="content">
      <app-collapsable-menu></app-collapsable-menu>
      <div class="router-outlet-wrapper" [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''">
        <router-outlet #o="outlet"></router-outlet>
      </div>
    </div>
  `,
  animations: [fadeAnimation],
})
export class MainLayoutComponent {}
