import { ESCAPE } from '@angular/cdk/keycodes';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategyOrigin,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { merge } from 'rxjs';
import { filter, first } from 'rxjs/operators';

export class Positions {
  private static leftAlign: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
  ];
  private static rightAlign: ConnectedPosition[] = [
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
  ];
  static dropdownLike: ConnectedPosition[] = [...Positions.leftAlign, ...Positions.rightAlign];
  static dropdownLikeRightAlign: ConnectedPosition[] = [...Positions.rightAlign, ...Positions.leftAlign];
  static menuLike: ConnectedPosition[] = [
    { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
  ];
}

export class OverlayablePayload {
  overlayTemplate: TemplateRef<any>;
  viewContainerRef: ViewContainerRef;
  overlay: Overlay;
  connectedTo: FlexibleConnectedPositionStrategyOrigin;
  onClose?: () => void;
  panelClass?: string | string[];
  connectedPositions: ConnectedPosition[];
}

export class Overlayable {
  protected popupRef: OverlayRef;

  constructor(private payload: OverlayablePayload) {
  }

  open(): void {
    const overlayConfig = new OverlayConfig({
      positionStrategy: this.createPopupPositionStrategy(),
      hasBackdrop: true,
      backdropClass: ['cdk-overlay-transparent-backdrop'],
      scrollStrategy: this.payload.overlay.scrollStrategies.block(),
      panelClass: this.payload.panelClass,
    });

    this.popupRef = this.payload.overlay.create(overlayConfig);

    merge(
      this.popupRef.backdropClick(),
      this.popupRef.detachments(),
      this.popupRef.keydownEvents().pipe(filter(event => event.keyCode === ESCAPE)),
    ).pipe(first()).subscribe(() => {
      if (this.payload.onClose) {
        this.payload.onClose();
      }
      this.popupRef.detach();
    });

    this.popupRef.attach(new TemplatePortal(this.payload.overlayTemplate, this.payload.viewContainerRef));
  }

  dispose() {
    this.popupRef.detach();
    this.popupRef.detachBackdrop();
  }

  private createPopupPositionStrategy(): PositionStrategy {

    return this.payload.overlay.position()
    .flexibleConnectedTo(this.payload.connectedTo)
    .withFlexibleDimensions(false)
    .withPush(false)
    .withPositions(this.payload.connectedPositions);
  }


}
