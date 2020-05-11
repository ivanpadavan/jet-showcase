import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, NgModule, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BindObservable } from 'bind-observable';
import { interval, Observable } from 'rxjs';
import { debounceTime, first, map } from 'rxjs/operators';
import { iconClasses } from '../services/icon-classes';
import { CollectionMenuItem, MenuItemsService } from '../services/menu-items.service';
import { OverlayDropdownDirective, OverlayDropdownDirectiveModule } from '../shared/dropdown/overlay-dropdown';
import { DefaultModalModule } from '../shared/modal/default-modal.component';


@Component({
  selector: 'app-menu-item-card',
  template: `
    <div class="input-group">
      <div class="input-group-prepend">
        <button class="btn btn-outline-secondary" [overlayDropdown]="iconSelectTpl" position="left">
          <i class="{{ menuItem.icon }} fa-fw"></i>
        </button>
      </div>
      <span class="form-control" *ngIf="!editLabel; else textFieldTpl" (click)="focusText()"
            style="cursor: pointer">{{ menuItem.label }}</span>
      <ng-template #textFieldTpl>
        <input #textField
               type="text" [(ngModel)]="menuItemsService.menuOrder[menuItem.collectionPK].name"
               class="form-control"
               (keydown.enter)="onBlur()"
               (keydown.escape)="onBlur()"
               (blur)="onBlur()"
        />
        <div class="input-group-append">
          <button class="btn btn-danger" (click)="clearField()">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </ng-template>
    </div>

    <ng-template #iconSelectTpl>
      <div class="card card-body">
        <div class="input-group iconed">
          <i class="fa fa-search"></i>
          <input type="text" class="form-control" [(ngModel)]="iconsSearch">
        </div>
        <cdk-virtual-scroll-viewport itemSize="50" class="icons-dropdown">
          <div *cdkVirtualFor="let icons of iconClasses$ | async">
            <i *ngFor="let i of icons"
               (click)="selectIcon(i)"
               style="cursor: pointer"
               class="{{ i }} fa-fw fa-2x"

            ></i>
          </div>
        </cdk-virtual-scroll-viewport>
      </div>
    </ng-template>
  `,
  styles: [`
      .icons-dropdown {
          overflow: auto;
          height: 150px;
      }

      .card.card-body {
          width: 15rem;
      }

      .icons-dropdown i {
          height: 30px;
          margin: 10px;
      }
  `]
})
export class MenuItemCardComponent {
  @ViewChild(OverlayDropdownDirective, { static: true }) private dropdown: OverlayDropdownDirective;
  @ViewChild('textField')
  textFieldElRef: ElementRef<HTMLInputElement>;

  @Input()
  menuItem: CollectionMenuItem;

  editLabel = false;

  @BindObservable()
  iconsSearch = '';
  iconsSearch$!: Observable<string>;

  iconClasses$ = this.iconsSearch$.pipe(
    debounceTime(100),
    map(term => iconClasses
      .filter(it => it.indexOf(term) !== -1)
      .reduce((a, b) => {
          if (a[a.length - 1].length > 2) {
            a.push([b]);
          } else {
            a[a.length - 1].push(b);
          }
          return a;
        },
        [[] as string[]]
      )
    ),
  );

  constructor(public menuItemsService: MenuItemsService, private cdRef: ChangeDetectorRef) {
  }

  focusText() {
    this.editLabel = true;
    this.cdRef.detectChanges();
    this.textFieldElRef.nativeElement.focus();
  }

  onBlur() {
    interval(30).pipe(
      first(),
    ).subscribe(() => {
      this.editLabel = false;
      this.menuItemsService.menuOrder = { ...this.menuItemsService.menuOrder };
    });
  }

  clearField() {
    this.menuItemsService.menuOrder[this.menuItem.collectionPK].name = undefined;
    this.menuItemsService.menuOrder = { ...this.menuItemsService.menuOrder };
  }

  selectIcon(icon) {
    this.dropdown.close();
    this.menuItemsService.menuOrder[this.menuItem.collectionPK].icon = icon;
    this.menuItemsService.menuOrder = { ...this.menuItemsService.menuOrder };
  }
}

@Component({
  selector: 'app-menu-items-modifier',
  template: `
    <app-default-modal>
      <div class="modal-title">
        Menu Items Reordering
      </div>
      <div class="reorder-container" cdkDropList (cdkDropListDropped)="drop($event)">
        <app-menu-item-card *ngFor="let menuItem of this.menuItemsService.menuItems$ | async"
                            class="card card-body shadow-sm"
                            [menuItem]="menuItem"
                            cdkDrag
        ></app-menu-item-card>
      </div>
    </app-default-modal>`
})

export class MenuItemsModifierComponent {
  @ViewChildren(MenuItemCardComponent) menuItemCardComponents: QueryList<MenuItemCardComponent>;

  constructor(public menuItemsService: MenuItemsService) {
  }

  drop(e: CdkDragDrop<CollectionMenuItem[]>) {
    const orderedPKs = this.menuItemCardComponents.map(it => it.menuItem.collectionPK);
    moveItemInArray(orderedPKs, e.previousIndex, e.currentIndex);
    orderedPKs.forEach((pk, ix) => this.menuItemsService.menuOrder[pk].position = ix);
    this.menuItemsService.menuOrder = { ...this.menuItemsService.menuOrder };
  }
}

@NgModule({
  imports: [CommonModule, DefaultModalModule, DragDropModule, FormsModule, OverlayDropdownDirectiveModule, ScrollingModule],
  declarations: [MenuItemsModifierComponent, MenuItemCardComponent],
  exports: [MenuItemsModifierComponent],
})
export class MenuItemsModifierModule {
}


