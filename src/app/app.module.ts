import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { VariableRouteReuseStrategy } from './shared/route-reuse-strategies/variable-route-reuse-strategy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', loadChildren: () => import('./main-layout/main-layout.module').then(m => m.MainLayoutModule) },
    ]),
    ModalModule.forRoot(),
    OverlayModule,
  ],
  providers: [
    VariableRouteReuseStrategy,
    { provide: RouteReuseStrategy, useExisting: VariableRouteReuseStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
