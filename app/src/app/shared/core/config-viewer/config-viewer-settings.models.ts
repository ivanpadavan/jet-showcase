import { Type } from '@angular/core';

export type ConfigViewerPayload = { component: Type<any> };

export abstract class DataProviderFactory<T, P extends ConfigViewerPayload> {
  abstract ctor: Type<T>;
  abstract create(data: P): T;
}
