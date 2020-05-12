import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CollapsableMenuItemComponent } from './collapsable-menu/collapsable-menu-item.component';
import { CollapsableMenuComponent } from './collapsable-menu/collapsable-menu.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';
import { MenuItemsModifierModule } from './menu-items-modifier.modal';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    MenuItemsModifierModule,
  ],
  declarations: [MainLayoutComponent, NavbarComponent, CollapsableMenuComponent, CollapsableMenuItemComponent],
  providers: [],
})
export class MainLayoutModule {
}
