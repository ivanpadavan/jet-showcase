import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class BaseComponent implements OnDestroy {
  destroyed$ = new Subject();

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

import { NgModule } from '@angular/core';

@NgModule({
  declarations: [BaseComponent],
})
class SuppressErrorModule {}
