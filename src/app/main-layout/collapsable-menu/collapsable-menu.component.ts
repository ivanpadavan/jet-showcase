import { ChangeDetectorRef, Component, Output } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { createTween } from 'rxjs-create-tween';
import { distinctUntilChanged, finalize, map, pairwise, startWith, switchMap } from 'rxjs/operators';
import { easeOutSine } from 'tween-functions';
import { MenuItem } from './menu-item.interface';

@Component({
  selector: 'app-collapsable-menu',
  template: `
  <div class="collapsable-menu {{ sidebarCollapsed ? 'collapsed' : 'expanded' }} {{ transition ? 'transition' : '' }}"
     (swiperight)="openSidebar()"
     (swipeleft)="closeSidebar()"
     [style.width]="tween$ | async">
    <ng-content></ng-content>
    <div class="menu-items-wrapper">
        <app-collapsable-menu-item
                *ngFor="let menuItem of menuItems$ | async"
                [menuItem]="menuItem"
        ></app-collapsable-menu-item>
        <div class="open-menu" (click)="toggleSidebar()">
            <div class="icon-container">
                <i class="fa fa-chevron-{{ sidebarCollapsed ? 'right' : 'left' }}"></i>
                <i class="fa fa-chevron-{{ sidebarCollapsed ? 'right' : 'left' }}"></i>
                <i class="fa fa-chevron-{{ sidebarCollapsed ? 'right' : 'left' }}"></i>
            </div>
        </div>
    </div>
</div>

  `,
})
export class CollapsableMenuComponent {
  private collapsedWidth = 3.3;
  private expandedWidth = 16;
  private collapsedInitially = true;

  @Output()
  private sidebarCollapsed$: BehaviorSubject<boolean>;
  sidebarCollapsed = this.collapsedInitially;
  transition = false;
  tween$: Observable<string>;

  menuItems$ = of([] as MenuItem[]);

  constructor(
    private cdRef: ChangeDetectorRef,
  ) {

    this.sidebarCollapsed$ = new BehaviorSubject<boolean>(this.collapsedInitially);
    this.tween$ = this.sidebarCollapsed$.pipe(
      distinctUntilChanged(),
      pairwise(),
      switchMap(([isCollapsedBefore, isCollapsedAfter]) => {
        const startX = this.getWidth(isCollapsedBefore);
        const endX = this.getWidth(isCollapsedAfter);
        const duration = 250;
        this.sidebarCollapsed = isCollapsedAfter;
        this.transition = true;
        return createTween(easeOutSine, startX, endX, duration).pipe(
          finalize(() => {
            this.transition = false;
            window.dispatchEvent(new Event('resize'));
            this.cdRef.detectChanges();
          }),
        );
      }),
      map(this.toEm),
      startWith(this.toEm(this.getWidth(this.collapsedInitially))),
    );
  }

  toggleSidebar() {
    this.sidebarCollapsed$.next(!this.sidebarCollapsed);
  }

  openSidebar() {
    this.sidebarCollapsed$.next(false);
  }

  closeSidebar() {
    this.sidebarCollapsed$.next(true);
  }

  private getWidth = (isCollapsed) => isCollapsed ? this.collapsedWidth : this.expandedWidth;
  private toEm = it => `${it}em`;
}
