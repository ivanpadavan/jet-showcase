import { Injectable } from '@angular/core';
import memo from 'memo-decorator';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { O } from 'ts-toolbelt';
import { listToObject } from '../shared/utils/list-to-object';
import { FetchService } from './fetch.service';

export class PKStorage<T extends object, K extends O.SelectKeys<T, string>> {
  list$ = this.source$.pipe(shareReplay(1));
  map$ = this.list$.pipe(map(collection => listToObject(
    collection,
    it => it[this.primaryKey] as any as string,
    (it: T) => it,
  )));
  order$ = this.list$.pipe(map(list => list.map(it => it[this.primaryKey])));

  constructor(private source$: Observable<T[]>, public primaryKey: K) {
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
