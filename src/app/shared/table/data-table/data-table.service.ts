import { Injectable } from '@angular/core';
import { BindObservable } from 'bind-observable';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, map, shareReplay, switchMap, tap } from 'rxjs/operators';

export interface ListResponse<T> {
  results: T[];
  count: number;
  num_pages: number;
  per_page: number;
}

export type SortOrder = 'asc' | 'desc';

export interface DataFetcherPayload {
  sortOrder?: SortOrder;
  sortBy?: string;
  page: number;
}

export const DefaultDtatFfetcherPayload: DataFetcherPayload = { page: 1 };

@Injectable()
export abstract class DataFetcher<T> {
  abstract fetch(d: DataFetcherPayload): Observable<ListResponse<T>>;
}

@Injectable({ providedIn: 'root' })
export class DataTableService<T> {
  @BindObservable()
  sortOrder: SortOrder;
  sortOrder$: Observable<SortOrder>;

  @BindObservable()
  sortBy: string;
  sortBy$: Observable<string>;

  @BindObservable()
  page = 1;
  page$: Observable<number>;

  results$: Observable<T[]>;
  paginatorData$: Observable<{ count: number, num_pages: number, per_page: number }>;

  constructor(
    private fetcher: DataFetcher<T>,
  ) {
    this.sortOrder = DefaultDtatFfetcherPayload.sortOrder;
    this.sortBy = DefaultDtatFfetcherPayload.sortBy;
    this.page = DefaultDtatFfetcherPayload.page;

    const response$ = combineLatest([
      this.page$,
      this.sortBy$,
      this.sortOrder$,
    ]).pipe(
      debounceTime(0),
      switchMap(([page, sortBy, sortOrder]) => this.fetcher.fetch({ page, sortBy, sortOrder })),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.results$ = response$.pipe(map(it => it.results));
    this.paginatorData$ = response$.pipe(tap(console.log));
  }


}
