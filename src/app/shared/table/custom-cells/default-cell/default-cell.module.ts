import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultCell } from './default-cell';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [DefaultCell],
  declarations: [DefaultCell],
})
export class DefaultCellModule {
}
