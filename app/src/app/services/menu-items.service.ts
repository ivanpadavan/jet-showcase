import { Injectable } from '@angular/core';
import { Compute } from 'Any/Compute';
import { BindObservable } from 'bind-observable';
import { combineLatest, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { MenuItem } from '../main-layout/collapsable-menu/menu-item.interface';
import { defaultSortByProp } from '../shared/utils/defaultSortByProp';
import { LocalStorage } from '../shared/utils/local-storage.decorator';
import { StateService } from './state.service';

export type MenuSettings = { [collection: string]: MenuCollectionSettings };
export type MenuCollectionSettings = { name?: string, icon?: string, position?: number };
export type CollectionMenuItem = Compute<MenuItem & { collectionPK: string }>;

@Injectable({ providedIn: 'root' })
export class MenuItemsService {
  @BindObservable()
  @LocalStorage({ initialValue: {} })
  menuSettings: MenuSettings;
  menuSettings$: Observable<MenuSettings>;

  menuItems$: Observable<CollectionMenuItem[]>;

  constructor(private stateService: StateService) {
    this.menuSettings = this.menuSettings; // due to decorator composition

    this.menuItems$ = this.stateService.collectionsStorage.order$
    .pipe(
      switchMap(order => combineLatest([
        of(order).pipe(tap(it => console.log(it))),
        this.stateService.collectionsStorage.map$.pipe(tap(it => console.log(it))),
        this.menuSettings$.pipe(map(menuSettings => this.addEmptyKeys(menuSettings, order))),
      ])),
      map(([order, collectionMap, settingsMap]) => {
        return order.map(k => ({
          label: settingsMap[k].name ?? collectionMap[k].db_table,
          icon: settingsMap[k].icon ?? 'fa fa-star',
          routerLink: `/collections/${collectionMap[k].db_table}`,
          collectionPK: k,
        })).sort(defaultSortByProp(it => this.menuSettings[it.collectionPK].position));
      }),
      shareReplay(1),
    );
  }

  private addEmptyKeys(menuSettings: MenuSettings, order: string[]) {
    for (const pk of order) {
      menuSettings[pk] = menuSettings[pk] || {};
    }
    return menuSettings;
  }
}
