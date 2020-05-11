import { CdkDrag, CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CollectionMenuItem, MenuItemsService } from '../services/menu-items.service';
import { DefaultModalModule } from '../shared/modal/default-modal.component';

@Component({
  selector: 'app-menu-items-modifier',
  template: `
    <app-default-modal>
      <div class="modal-title">
        Menu Items Reordering
      </div>
      <div class="reorder-container" cdkDropList (cdkDropListDropped)="drop($event)">
        <div class="card card-body shadow-sm"
             *ngFor="let menuItem of this.menuItemsService.menuItems$ | async"
             cdkDrag
             [cdkDragData]="menuItem"
        >
          <span>{{ menuItem.label }}</span>
        </div>
      </div>
    </app-default-modal>`
})

export class MenuItemsModifierComponent implements OnInit {
  @ViewChildren(CdkDrag) dragRefs: QueryList<CdkDrag>;
  constructor(public menuItemsService: MenuItemsService) {
  }

  ngOnInit() {

  }

  drop(e: CdkDragDrop<CollectionMenuItem[]>) {
    const orderedPKs = this.dragRefs.map(it => (it.data as CollectionMenuItem).collectionPK);
    moveItemInArray(orderedPKs, e.previousIndex, e.currentIndex);
    orderedPKs.forEach((pk, ix) => this.menuItemsService.menuOrder[pk].position = ix);
    this.menuItemsService.menuOrder = { ...this.menuItemsService.menuOrder };
  }
}

@NgModule({
  imports: [CommonModule, DefaultModalModule, DragDropModule],
  declarations: [MenuItemsModifierComponent],
  exports: [MenuItemsModifierComponent],
})
export class MenuItemsModifierModule {
}


