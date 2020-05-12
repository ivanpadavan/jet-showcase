import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [RedirectToTheMainPageGuard], TODO prefix is set guard
    children: [
      {
        path: 'collections',
        loadChildren: () => import('../collection/collection.module').then(m => m.CollectionModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {
}
