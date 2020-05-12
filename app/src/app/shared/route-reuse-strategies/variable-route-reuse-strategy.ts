import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { DefaultRouteReuseStrategy } from './default-route-reuse-strategy';

@Injectable()
export class VariableRouteReuseStrategy implements RouteReuseStrategy {
  private instance: RouteReuseStrategy = new DefaultRouteReuseStrategy();

  setRouteReuseStrategy(rrs: RouteReuseStrategy) {
    this.instance = rrs;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.instance.retrieve(route);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.instance.shouldAttach(route);
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.instance.shouldDetach(route);
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return this.instance.shouldReuseRoute(future, curr);
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    this.instance.store(route, handle);
  }
}
