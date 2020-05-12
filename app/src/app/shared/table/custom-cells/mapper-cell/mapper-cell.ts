import { Component } from '@angular/core';
import { CellData } from '../../table-config.model';

@Component({
  selector: 'app-mapper-cell',
  template: `
    <div [innerHtml]="value"></div>
  `,
})

// tslint:disable-next-line:component-class-suffix
export class MapperCell {
  value: string;

  constructor(public cellData: CellData<any, (t) => any>) {
    this.value = this.cellData.column.data(this.cellData.row);
  }
}
