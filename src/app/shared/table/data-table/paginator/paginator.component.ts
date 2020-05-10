import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataTableService } from '../data-table.service';

@Component({
  selector: 'app-paginator',
  template: `
    <ng-container *ngIf="s.paginatorData$ | async as d">
      <ul *ngIf="d.count" class="pagination">
        <li class="page-item" [class.disabled]="s.page <= 1" (click)="setPage(1)">
          <a class="page-link" style="cursor: pointer">&laquo;</a>
        </li>
        <li class="page-item" *ngIf="s.page > 4 && s.page + 1 > d.num_pages" (click)="setPage(s.page - 4)">
          <a class="page-link" style="cursor: pointer">{{s.page - 4}}</a>
        </li>
        <li class="page-item" *ngIf="s.page > 3 && s.page + 2 > d.num_pages" (click)="setPage(s.page - 3)">
          <a class="page-link" style="cursor: pointer">{{s.page - 3}}</a>
        </li>
        <li class="page-item" *ngIf="s.page > 2" (click)="setPage(s.page - 2)">
          <a class="page-link" style="cursor: pointer">{{s.page - 2}}</a>
        </li>
        <li class="page-item" *ngIf="s.page > 1" (click)="setPage(s.page - 1)">
          <a class="page-link" style="cursor: pointer">{{s.page - 1}}</a>
        </li>
        <li class="page-item active">
          <a class="page-link" style="cursor: pointer">{{s.page}}</a>
        </li>
        <li class="page-item" *ngIf="s.page + 1 <= d.num_pages" (click)="setPage(s.page + 1)">
          <a class="page-link" style="cursor: pointer">{{s.page + 1}}</a>
        </li>
        <li class="page-item" *ngIf="s.page + 2 <= d.num_pages" (click)="setPage(s.page + 2)">
          <a class="page-link" style="cursor: pointer">{{s.page + 2}}</a>
        </li>
        <li class="page-item" *ngIf="s.page + 3 <= d.num_pages && s.page < 3" (click)="setPage(s.page + 3)">
          <a class="page-link" style="cursor: pointer">{{s.page + 3}}</a>
        </li>
        <li class="page-item" *ngIf="s.page + 4 <= d.num_pages && s.page < 2" (click)="setPage(s.page + 4)">
          <a class="page-link" style="cursor: pointer">{{s.page + 4}}</a>
        </li>
        <li class="page-item" [class.disabled]="s.page >= d.num_pages" (click)="setPage(d.num_pages)">
          <a class="page-link" style="cursor: pointer">&raquo;</a>
        </li>
      </ul>
      <span *ngIf="d.count && d.count > 5" class="d.count-info">
          {{
        ((s.page - 1) * d.per_page + 1) +
        (
          (s.page - 1) * d.per_page + 1 === d.count
            ? ''
            : '-' +
            (
              s.page === d.num_pages ?
                d.count :
                (s.page) * d.per_page
            )
        )
        + ' из ' + d.count
        }}
        </span>
      <ng-content></ng-content>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {

  constructor(public s: DataTableService<any>) {
  }

  setPage(page) {
    this.s.page = page;
  }
}
