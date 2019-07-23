import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthorityComponent} from './authority.component';
import {UserListComponent} from './user/list/list.component';
import {RoleListComponent} from './role/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorityComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'roles',
        component: RoleListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorityRoutingModule {}
