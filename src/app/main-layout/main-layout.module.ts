import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CollapsableMenuItemComponent } from './collapsable-menu/collapsable-menu-item.component';
import { CollapsableMenuComponent } from './collapsable-menu/collapsable-menu.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
  ],
  declarations: [MainLayoutComponent, NavbarComponent, CollapsableMenuComponent, CollapsableMenuItemComponent],
  providers: [],
})
export class MainLayoutModule {}
