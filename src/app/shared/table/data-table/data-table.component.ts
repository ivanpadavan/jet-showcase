import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ColumnConfig } from '../table-config.model';
import { DataTableService } from './data-table.service';

@Component({
  selector: 'app-data-table',
  template: `
    <app-table [columns]="columns" [rows]="s.results$ | async">
    </app-table>
  `,
  providers: [DataTableService],
})

export class DataTableComponent<T> implements OnChanges {
  @Input()
  columns: ColumnConfig[];

  constructor(public s: DataTableService<any>) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.columns.forEach(c => {
        if (!c.headerComponent) {
          // c.headerComponent = SorterComponent;
        }
      });
    }
  }
}
