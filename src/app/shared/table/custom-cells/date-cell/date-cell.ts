import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CellData } from '../../table-config.model';

export const timezoneMoscow = { timezone: '+0600' };

/*tslint:disable component-class-suffix*/
@Component({
  selector: 'app-date-cell',
  template: `<span>{{ data.value | date:format:timezone }}</span>`,
})
export class DateCell {
  format: string;
  timezone: string;

  constructor(public data: CellData) {
    const payload: any = data.column.data;
    this.format = 'short';
    if (typeof payload === 'string') {
      this.format = payload;
    } else if (typeof payload === 'object') {
      this.format = payload.format || this.format;
      this.timezone = payload.timezone;
    }
  }
}

import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  exports: [DateCell],
  declarations: [DateCell],
})
export class DateCellModule {}
