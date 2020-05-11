import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, NgModule, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { CollectionMenuItem, MenuItemsService } from '../services/menu-items.service';
import { DefaultModalModule } from '../shared/modal/default-modal.component';


@Component({
  selector: 'app-menu-item-card',
  template: `
    <h5 class="h-100 d-flex align-items-center">
      <i class="{{ menuItem.icon }} mr-3"></i>
      <span class="form-control" *ngIf="!editLabel; else textFieldTpl" (click)="focusText()"
            style="cursor: pointer">{{ menuItem.label }}</span>
      <ng-template #textFieldTpl>
        <div class="input-group">
          <input #textField
                 type="text" [(ngModel)]="menuItemsService.menuOrder[menuItem.collectionPK].name"
                 class="form-control"
                 (keydown.enter)="onBlur()"
                 (keydown.escape)="onBlur()"
                 (blur)="onBlur()"
          />
          <button class="btn btn-danger input-group-append" (click)="clearField()">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </ng-template>
    </h5>
  `
})
export class MenuItemCardComponent {
  @ViewChild('textField')
  textFieldElRef: ElementRef<HTMLInputElement>;

  @Input()
  menuItem: CollectionMenuItem;

  editLabel = false;

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
  imports: [CommonModule, DefaultModalModule, DragDropModule, FormsModule],
  declarations: [MenuItemsModifierComponent, MenuItemCardComponent],
  exports: [MenuItemsModifierComponent],
})
export class MenuItemsModifierModule {
}


