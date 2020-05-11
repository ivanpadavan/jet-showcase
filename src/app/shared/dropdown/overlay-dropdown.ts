import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Directive, ElementRef, Input, NgModule, OnChanges, OnDestroy, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Overlayable, Positions } from './overlayable';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[overlayDropdown]', exportAs: 'overlay-dropdown' })
export class OverlayDropdownDirective implements OnChanges, OnDestroy {
  @Input() overlayDropdown: TemplateRef<any>;
  @Input() position: 'left' | 'right' = 'right';
  @Input() panelClass?: string;
  private instance: Overlayable;
  private sub = new Subscription();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
    private elRef: ElementRef<HTMLElement>,
  ) {
    this.sub = fromEvent(this.elRef.nativeElement, 'click')
      .subscribe(() => this.instance.open());
  }

  close() {
    this.instance.dispose();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.instance) {
      this.instance.dispose();
    }
    this.instance = new Overlayable({
      overlay: this.overlay,
      overlayTemplate: this.overlayDropdown,
      connectedTo: this.elRef,
      viewContainerRef: this.viewContainerRef,
      connectedPositions: this.position === 'right'
        ? Positions.dropdownLikeRightAlign
        : Positions.dropdownLike,
      panelClass: this.panelClass,
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [OverlayDropdownDirective],
  exports: [OverlayDropdownDirective],
})
export class OverlayDropdownDirectiveModule {}


