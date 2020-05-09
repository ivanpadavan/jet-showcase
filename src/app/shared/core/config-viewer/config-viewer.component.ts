import { ChangeDetectionStrategy, Component, Injector, Input, OnChanges } from '@angular/core';
import { ConfigViewerPayload, DataProviderFactory } from './config-viewer-settings.models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[config-viewer]',
  template: `
    <ng-container *ngIf="data.component">
      <ng-template [ngComponentOutlet]="data.component"
                   [ngComponentOutletInjector]="injectorToProvide"
      ></ng-template>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigViewerComponent<T, P extends ConfigViewerPayload> implements OnChanges {
  @Input() data: P;

  public cellData: T;
  public injectorToProvide: Injector;


  constructor(private injector: Injector, private dataProviderFactory: DataProviderFactory<T, P>) {
  }

  ngOnChanges() {
    this.cellData = this.dataProviderFactory.create(this.data);
    this.injectorToProvide = Injector.create({
      providers: [
        {
          provide: this.dataProviderFactory.ctor,
          useValue: this.cellData,
        },
      ],
      parent: this.injector,
    });
  }
}
