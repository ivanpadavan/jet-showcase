import { Injectable } from '@angular/core';
import memo from 'memo-decorator';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { O } from 'ts-toolbelt';
import { listToObject } from '../shared/utils/list-to-object';
import { FetchService } from './fetch.service';

export class PKStorage<T extends object, K extends O.SelectKeys<T, string>> {
  list$ = this.source$.pipe(shareReplay(1));
  map$ = this.list$.pipe(
    map(collection => listToObject(
      collection,
      (it: T) => this.getPrimaryField(it),
    )),
    shareReplay(1),
  );
  order$ = this.list$.pipe(
    map(list => list.map(it => this.getPrimaryField(it))),
    shareReplay(1),
  );


  constructor(private source$: Observable<T[]>, public primaryKey: K) {
  }

  private getPrimaryField(entity: T): string {
    return entity[this.primaryKey] as any;
  }

}

@Injectable({ providedIn: 'root' })
export class StateService {

  collectionsStorage = new PKStorage(this.fetchService.getModelDescriptions(), 'model');

  constructor(private fetchService: FetchService) {
  }

  @memo()
  getFieldsForCollectionStorage(collection: string) {
    const fields$ = this.collectionsStorage.map$.pipe(map(it => it[collection].fields || []));
    return new PKStorage(fields$, 'name');
  }
}
