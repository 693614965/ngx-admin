import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {ViewsComponent} from './views.component';
import {NotFoundComponent} from '../pages/miscellaneous/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'authority',
        loadChildren: () =>
          import('./authority/authority.module').then(m => m.AuthorityModule),
      },
      {
        path: 'system',
        loadChildren: () =>
          import('./system/system.module').then(m => m.SystemModule),
      },
      {
        path: '',
        redirectTo: 'authority',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
