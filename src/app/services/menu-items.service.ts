import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem } from '../main-layout/collapsable-menu/menu-item.interface';
import { FetchService } from './fetch.service';

@Injectable({ providedIn: 'root' })
export class MenuItemsService {
  menuItems$: Observable<MenuItem[]>;
  collectionMenuItems$: Observable<MenuItem[]>;

  constructor(private fetchService: FetchService) {
    this.collectionMenuItems$ = this.fetchService.getModelDescriptions().pipe(map(modelDescriptions => modelDescriptions.map(it => ({
      label: it.db_table,
      routerLink: `/collections/${it.db_table}`
    }))));
    this.menuItems$ = this.collectionMenuItems$.pipe(map(children => [{
      header: true,
      icon: 'fa fa-star',
      children,
      label: 'Collections',
    }]));
  }
}
