import { Type, Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { ConfigViewerPayload, DataProviderFactory } from '../core/config-viewer/config-viewer-settings.models';

export interface ColumnConfig<T = any> extends ConfigViewerPayload {
  prop?: string;
  name?: string;
  headerComponent?: Type<any>;
  data?: T;
}

export interface CellDataPayload<T1 = any, T2 = undefined> extends ConfigViewerPayload {
  column: ColumnConfig<T2>;
  row?: T1;
  index?: number;
}

export class CellData<T1 = any, T2 = undefined> {
  constructor(
    public column: ColumnConfig<T2>,
    public row: T1,
    public index: number,
  ) {}

  get value() {
    return this.getProperty(this.column.prop);
  }

  getProperty(prop) {
    return prop && prop.slice(0, 5) === 'item.'
      ? this.getNestedPropertyValue(this.row, prop.slice(5))
      : '';
  }

  private getNestedPropertyValue(value, properties) {
    properties = typeof properties === 'object' ? properties : properties.split('.');
    return properties.length && !isNullOrUndefined(value) ?
      this.getNestedPropertyValue(value[properties[0]], properties.slice(1)) :
      value;
  }
}

@Injectable()
export class CellDataFactory extends DataProviderFactory<CellData, CellDataPayload> {
  ctor = CellData;

  create(data: CellDataPayload): CellData {
    return new CellData(data.column, data.row, data.index);
  }
}
