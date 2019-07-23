import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SystemComponent} from './system.component';
import {MenuListComponent} from './menu/list/list.component';
import {PermissionListComponent} from './permission/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      {
        path: '',
        redirectTo: 'menus',
        pathMatch: 'full',
      },
      {
        path: 'menus',
        component: MenuListComponent,
      },
      {
        path: 'permissions',
        component: PermissionListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {}
