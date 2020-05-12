import { CommonModule } from '@angular/common';
import { Component, NgModule, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlwaysCacheRouteReuseStrategy, COMPONENTS_TO_CACHE } from '../shared/route-reuse-strategies/always-cache-route-reuse-strategy';
import { DefaultRouteReuseStrategy } from '../shared/route-reuse-strategies/default-route-reuse-strategy';
import { VariableRouteReuseStrategy } from '../shared/route-reuse-strategies/variable-route-reuse-strategy';
import { DataTableModule } from '../shared/table/data-table/data-table.module';
import { TableModule } from '../shared/table/table.module';
import { CollectionComponent } from './collection.component';

@Component({
  selector: 'app-collection-wrapper',
  template: `
    <router-outlet></router-outlet>`
})

export class CollectionWrapperComponent implements OnDestroy {
  constructor(
    private variableRRS: VariableRouteReuseStrategy,
    private cachingRRS: AlwaysCacheRouteReuseStrategy,
  ) {
    this.variableRRS.setRouteReuseStrategy(this.cachingRRS);
  }

  ngOnDestroy(): void {
    this.variableRRS.setRouteReuseStrategy(new DefaultRouteReuseStrategy());
  }
}


@NgModule({
  imports: [CommonModule, RouterModule.forChild([
    {
      path: '',
      component: CollectionWrapperComponent,
      children: [
        {
          path: ':collection',
          component: CollectionComponent,
        }
      ]
    }
  ]), TableModule, DataTableModule],
  exports: [],
  declarations: [CollectionWrapperComponent, CollectionComponent],
  providers: [
    AlwaysCacheRouteReuseStrategy,
    {
      provide: COMPONENTS_TO_CACHE,
      useValue: CollectionComponent,
      multi: true,
    },
  ],
})
export class CollectionModule {
}
