import { ComponentRef } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export abstract class AbstractCachingRouteReuseStrategy<K> implements RouteReuseStrategy {
  private handlers = new Map<K, DetachedRouteHandle>();

  protected abstract shouldBeDetached(route: ActivatedRouteSnapshot): boolean;

  protected abstract keyCb(route: ActivatedRouteSnapshot): K;

  dispose() {
    [...this.handlers.values()]
    .map(it => (it as any).componentRef)
    .forEach((c: ComponentRef<any>) => c.destroy());
  }

  /**
   * Determines if this route (and its subtree) should be detached to be reused later
   * @param route
   */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.shouldBeDetached(route);
  }

  /**
   * Stores the detached route.
   */
  store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
    if (!this.handlers.get(this.keyCb(route))) {
      this.handlers.set(this.keyCb(route), handler);
    }
  }

  /**
   * Determines if this route (and its subtree) should be reattached
   * @param route Stores the detached route.
   */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.shouldBeDetached(route) && !!this.handlers.has(this.keyCb(route));
  }

  /**
   * Retrieves the previously stored route
   */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (this.shouldBeDetached(route) === false) {
      return null;
    }
    return this.handlers.get(this.keyCb(route));
  }

  /**
   * Determines if a route should be reused
   * @param future
   * @param current
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    if (this.shouldBeDetached(future) === false) {
      return future.routeConfig === current.routeConfig;
    }
    return this.keyCb(future) === this.keyCb(current);
  }
}
