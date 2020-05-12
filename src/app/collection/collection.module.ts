import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTableModule } from '../shared/table/data-table/data-table.module';
import { TableModule } from '../shared/table/table.module';

import { CollectionComponent } from './collection.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: ':collection', component: CollectionComponent }]), TableModule, DataTableModule],
  exports: [],
  declarations: [CollectionComponent],
  providers: [],
})
export class CollectionModule {
}
