import { Inject, Injectable, InjectionToken, Type } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AbstractCachingRouteReuseStrategy } from './abstract-caching-route-reuse-strategy';

export const COMPONENTS_TO_CACHE = new InjectionToken<Type<any>[]>('COMPONENTS_TO_CACHE');

@Injectable()
export class AlwaysCacheRouteReuseStrategy extends AbstractCachingRouteReuseStrategy<string> {
  constructor(@Inject(COMPONENTS_TO_CACHE) private components: Type<any>[]) {
    super();
  }

  protected keyCb(route: ActivatedRouteSnapshot) {
    return JSON.stringify({
      ...route.routeConfig,
      ...route.params,
    });
  }

  protected shouldBeDetached = (route: ActivatedRouteSnapshot) => {
    return !!this.components.find(c => c === route.routeConfig?.component);
  }

}
