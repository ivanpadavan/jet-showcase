import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { P } from '../services/fetch.service';
import { FieldType } from '../services/jet.interfaces';
import { StateService } from '../services/state.service';
import { BooleanCell } from '../shared/table/custom-cells/boolean-cell/boolean-cell';
import { DateCell } from '../shared/table/custom-cells/date-cell/date-cell';
import { DefaultCell } from '../shared/table/custom-cells/default-cell/default-cell';
import { DataFetcher, DataFetcherPayload, ListResponse } from '../shared/table/data-table/data-table.service';
import { ColumnConfig } from '../shared/table/table-config.model';

function resolveComponent(f: FieldType): Type<any> {
  if (f === 'DateTimeField' || f === 'TimeStampField') {
    return DateCell;
  }
  if (f === 'BooleanField') {
    return BooleanCell;
  }
  return DefaultCell;
}

@Injectable()
export class CollectionDataFetcher extends DataFetcher<any> {
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    super();
  }

  fetch(d: DataFetcherPayload): Observable<ListResponse<any>> {
    let orderBy = d.sortBy;
    if (orderBy) {
      orderBy = d.sortOrder === 'desc' ? '-' + orderBy : orderBy;
    }
    let url = `${P}/models/${this.route.snapshot.params.collection}/?page=${d.page}`;
    if (orderBy) {
      url += `&_order_by=${orderBy}`;
    }
    return this.http.get<ListResponse<any>>(url);
  }
}

@Component({
  selector: 'app-collection',
  template: `
    <ng-container *ngIf="tableConfig$ | async as tc">
      <app-data-table [columns]="tc"></app-data-table>
    </ng-container>
  `,
  providers: [
    {
      provide: DataFetcher,
      useClass: CollectionDataFetcher,
    }
  ]
})
export class CollectionComponent {
  tableConfig$: Observable<ColumnConfig[]>;

  constructor(private stateService: StateService, private route: ActivatedRoute) {
    this.tableConfig$ = this.stateService.collectionsStorage.map$
    .pipe(
      map(it => it[this.route.snapshot.params.collection]),
      map(({ fields }) => fields.map(data => ({
        data,
        prop: `item.${data.db_column}`,
        name: data.db_column,
        component: resolveComponent(data.field),
      }))),
    );
  }
}
