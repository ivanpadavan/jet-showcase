import { ChangeDetectorRef, Component } from '@angular/core';
import { CellData } from '../../table-config.model';
import { DataTableService } from '../data-table.service';

@Component({
  selector: 'app-table-sorter',
  template: `
    <div class="text-center text-nowrap" style="cursor: pointer;"
         (click)='sort()'>
      {{ cellData.column.name }}
      <div style="margin-left: 4px; display: inline;">
        <i *ngIf="sortBy !== (s.sortBy$ | async); else toggled" class="fa fa-sort"></i>
        <ng-template #toggled>
          <i *ngIf="s.sortOrder === 'asc'" class='fa fa-sort-up' aria-hidden='true'></i>
          <i *ngIf="s.sortOrder === 'desc'" class='fa fa-sort-down' aria-hidden='true'></i>
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

  constructor(public cellData: CellData, public s: DataTableService<any>, private cdRef: ChangeDetectorRef) {
  }

  sort() {
    this.s.sortOrder = this.s.sortOrder === 'asc' ? 'desc' : 'asc';
    console.log(this.s.sortOrder);
    this.s.sortBy = this.sortBy;
    this.cdRef.detectChanges();
  }
}
