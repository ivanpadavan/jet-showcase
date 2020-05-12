/*tslint:disable component-class-suffix*/
import { Component } from '@angular/core';
import { CellData } from '../../table-config.model';

@Component({
  selector: 'app-default-cell',
  template: `
    {{ data.value }}
  `,
})

export class DefaultCell {
  constructor(public data: CellData) {
  }
}
