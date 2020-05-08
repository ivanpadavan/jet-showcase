import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavbarContentService {
  private templateSubject$: BehaviorSubject<TemplateRef<any>> = new BehaviorSubject(null);
  template$ = this.templateSubject$.asObservable();

  private toggleSubject$ = new BehaviorSubject<boolean>(false);
  toggle$ = this.toggleSubject$.asObservable();

  setTemplate(template: TemplateRef<any>) {
    this.templateSubject$.next(template);
  }

  removeTemplate() {
    this.templateSubject$.next(null);
  }

  toggle() {
    this.toggleSubject$.next(!this.toggleSubject$.value);
  }
}
