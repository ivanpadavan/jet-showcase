import { Injectable } from '@angular/core';
import { Compute } from 'Any/Compute';
import { BindObservable } from 'bind-observable';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, shareReplay, switchMap, tap } from 'rxjs/operators';
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
  @LocalStorage({ initialValue: undefined })
  menuSettings: MenuSettings;
  menuSettings$: Observable<MenuSettings>;

  menuItems$: Observable<CollectionMenuItem[]>;

  constructor(private stateService: StateService) {
    this.populateMenuSettingsWithEmptyValues();

    this.menuItems$ = this.stateService.collectionsStorage.order$
    .pipe(
      switchMap(order => combineLatest([
        of(order),
        this.stateService.collectionsStorage.map$,
        this.menuSettings$,
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

  private populateMenuSettingsWithEmptyValues() {
    this.stateService.collectionsStorage.order$
    .pipe(
      first(),
      tap(order => {
        if (this.menuSettings === undefined) {
          this.menuSettings = {};
        }
        order.forEach(pk => {
          if (this.menuSettings[pk] === undefined) {
            this.menuSettings[pk] = {};
          }
        });
        this.menuSettings = { ...this.menuSettings };
      }),
    ).subscribe();
  }
}
