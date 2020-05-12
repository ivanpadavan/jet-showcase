import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigViewerModule } from '../core/config-viewer/config-viewer.module';
import { DefaultCellModule } from './custom-cells/default-cell/default-cell.module';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConfigViewerModule, DefaultCellModule],
  declarations: [
    TableComponent,
  ],
  exports: [
    TableComponent,
    ConfigViewerModule,
  ],
  providers: [],
})
export class TableModule {
}
