import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { DataProviderFactory } from '../../core/config-viewer/config-viewer-settings.models';
import { DefaultCell } from '../custom-cells/default-cell/default-cell';
import { CellDataFactory, CellDataPayload, ColumnConfig } from '../table-config.model';

type Row = any;

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: DataProviderFactory, useClass: CellDataFactory}],
})
export class TableComponent implements OnChanges {
  private columnsInternal: ColumnConfig[];

  get columns(): ColumnConfig[] {
    return this.columnsInternal;
  }

  @Input() set columns(c: ColumnConfig[]) {
    c.forEach(it => {
      if (!it.component) {
        it.component = DefaultCell;
      }
      this.columnsInternal = c;
    });
  }

  @Input() rows: Row[] = [];

  @Input() noRowsMessage = 'Table is empty';

  headerColumns: CellDataPayload[];
  cells: CellDataPayload[][] = [[]];

  private cache = new WeakMap<Row, WeakMap<ColumnConfig, CellDataPayload>>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.columns) {
      this.headerColumns = this.columns
      .map(it => ({column: {...it, component: it.headerComponent}, component: it.headerComponent}));
    }

    if ((changes.columns || changes.rows) && this.rows && this.columns) {
      this.cells = this.rows.map(row =>
        this.columns.map((column, index) =>
          this.getData(row, column, index)
        )
      );
    }
  }

  getData(row: Row, column: ColumnConfig, index: number): CellDataPayload {
    const setValueAndReturn = () => {
      const value = {
        column,
        row,
        index,
        component: column.component,
      };
      this.cache.get(row).set(column, value);
      return value;
    };

    if (!this.cache.has(row)) {
      this.cache.set(row, new WeakMap());
      return setValueAndReturn();
    }
    if (!this.cache.get(row).has(column)) {
      return setValueAndReturn();
    }
    return this.cache.get(row).get(column);
  }

  trackByIndex(index: number) {
    return index;
  }
  trackByValue(index: number, value) {
    return value;
  }
  trackByStringifiedValue(index: number, value) {
    return JSON.stringify(value);
  }
  trackByCellDataPayload(_, { column, index, row, component }: CellDataPayload) {
    return JSON.stringify({ column, index, row, component });
  }
}
