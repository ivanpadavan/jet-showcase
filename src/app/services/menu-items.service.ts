import { Injectable } from '@angular/core';
import { Compute } from 'Any/Compute';
import { BindObservable } from 'bind-observable';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { MenuItem } from '../main-layout/collapsable-menu/menu-item.interface';
import { defaultSortByProp } from '../shared/utils/defaultSortByProp';
import { LocalStorage } from '../shared/utils/local-storage.decorator';
import { StateService } from './state.service';

export type MenuOrder = { [collection: string]: { name?: string, icon?: string, position?: number } };
export type CollectionMenuItem = Compute<MenuItem & { collectionPK: string }>;

@Injectable({ providedIn: 'root' })
export class MenuItemsService {
  @BindObservable()
  @LocalStorage({ initialValue: undefined })
  menuOrder: MenuOrder;
  menuOrder$: Observable<MenuOrder>;

  menuItems$: Observable<CollectionMenuItem[]>;

  constructor(private stateService: StateService) {
    this.stateService.collectionsStorage.order$
    .pipe(
      first(),
      tap(order => {
        if (this.menuOrder === undefined) {
          this.menuOrder = {};
        }
        order.forEach(pk => {
          if (this.menuOrder[pk] === undefined) {
            this.menuOrder[pk] = {};
          }
        });
        this.menuOrder = { ...this.menuOrder };
      }),
    ).subscribe();

    this.menuItems$ = this.stateService.collectionsStorage.order$
    .pipe(
      switchMap(order => combineLatest([
        of(order),
        this.stateService.collectionsStorage.map$,
        this.menuOrder$,
      ])),
      map(([order, collectionMap, settingsMap]) => {
        return order.map(k => ({
          label: settingsMap[k]?.name ?? collectionMap[k].db_table,
          icon: settingsMap[k]?.icon ?? 'fa fa-star',
          routerLink: `/collections/${collectionMap[k].db_table}`,
          collectionPK: k,
        })).sort(defaultSortByProp(it => this.menuOrder[it.collectionPK]?.position));
      }),
      tap(it => console.log(it)),
      shareReplay(1),
    );
  }
}
