import { Component } from '@angular/core';
import { CellData } from '../../table-config.model';
import { DataTableService } from '../data-table.service';

@Component({
  selector: 'app-table-sorter',
  template: `
    <div class="text-center text-nowrap" style="cursor: pointer;"
         (click)='sort()'>
      <ng-content></ng-content>
      <div style="margin-left: 4px; display: inline;">
        <span *ngIf="sortBy != s.sortBy; else toggled" class="fa fa-sort"></span>
        <ng-template #toggled>
          <span *ngIf="s.sortOrder==='asc'" class='fa fa-sort-asc' aria-hidden='true'></span>
          <span *ngIf="s.sortOrder==='desc'" class='fa fa-sort-desc' aria-hidden='true'></span>
        </ng-template>
      </div>
    </div>`,
  styles: [`
      .text-center:hover .fa {
          opacity: 1;
      }

      .fa {
          opacity: 0.3;
      }
  `],
})
export class SorterComponent {
  sortBy = this.cellData.column.prop.split('.').slice(1).join('.');

  constructor(public cellData: CellData, public s: DataTableService<any>) {
  }

  sort() {
    this.s.sortOrder = this.s.sortOrder === 'asc' ? 'desc' : 'asc';
    this.s.sortBy = this.sortBy;
  }
}
