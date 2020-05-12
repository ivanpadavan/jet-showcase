import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { toggleAnimationQuick } from '../../shared/animations/toggle.animation';
import { MenuItem } from './menu-item.interface';


@Component({
  selector: 'app-collapsable-menu-item',
  template: `
      <div class="menu-item-container {{ menuItem.header ? 'header' : '' }}"
           [routerLinkActive]="menuItem.routerLink ? 'selected' : ''"
           (click)="menuItem.onclick ? menuItem.onclick() : false"
           (mouseenter)="openSubmenu()"
           (mouseleave)="closeSubmenu()">
          <a class="icon-container" [routerLink]="menuItem.routerLink">
              <i class="{{ menuItem.icon }}"></i>
          </a>
          <div class="menu-item-wrapper">
              <a class="menu-item-title"
                 [routerLink]="menuItem.routerLink"
                 [innerHTML]="menuItem.label"
              ></a>
              <div *ngIf="hasChildren" class="menu-item-submenu" [@open]="isOpened ? 'open' : 'close'">
                  <app-collapsable-menu-item *ngFor="let menuItem of menuItem.children"
                                             [menuItem]="menuItem"
                                             [routerLink]="menuItem.routerLink"
                  ></app-collapsable-menu-item>
              </div>
          </div>
      </div>
  `,
  animations: [toggleAnimationQuick],
})

export class CollapsableMenuItemComponent implements OnChanges {
  @Input() menuItem: MenuItem;
  @Input() closedAnyway = false;
  hasChildren = false;
  isOpened = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.hasChildren = !!(this.menuItem.children && this.menuItem.children.length);
    if (this.closedAnyway) {
      this.isOpened = false;
    }
  }

  openSubmenu() {
    this.isOpened = true;
  }

  closeSubmenu() {
    this.isOpened = false;
  }
}
