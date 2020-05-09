import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigViewerComponent } from './config-viewer.component';
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ConfigViewerComponent],
  exports: [ConfigViewerComponent],
})
export class ConfigViewerModule {
}
