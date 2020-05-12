import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from '../table.module';

import { DataTableComponent } from './data-table.component';
import { PaginatorModule } from './paginator/paginator.module';
import { SorterComponent } from './sorter/sorter.component';

@NgModule({
  imports: [CommonModule, TableModule, PaginatorModule],
  declarations: [DataTableComponent, SorterComponent],
  exports: [DataTableComponent],
})
export class DataTableModule {
}
