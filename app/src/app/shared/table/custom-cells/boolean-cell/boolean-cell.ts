import { Component } from '@angular/core';
import { CellData } from '../../table-config.model';

/*tslint:disable component-class-suffix*/
@Component({
  selector: 'app-date-cell',
  template: `<i class="fa fa-3x fa-{{ data.value ? 'check text-success' : 'times text-danger'}}"></i>`,
})
export class BooleanCell {
  constructor(public data: CellData<boolean>) {}
}
