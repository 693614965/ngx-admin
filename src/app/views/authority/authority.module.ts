import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule,} from '@nebular/theme';
import {NgZorroAntdModule} from 'ng-zorro-antd';

import {ThemeModule} from '../../@theme/theme.module';
import {AuthorityRoutingModule} from './authority-routing.module';

import {AuthorityComponent} from './authority.component';
import {UserListComponent} from './user/list/list.component';
import {UserAddComponent} from './user/add/add.component';
import {UserEditComponent} from './user/edit/edit.component';

import {RoleListComponent} from './role/list/list.component';
import {RoleAddComponent} from './role/add/add.component';

@NgModule({
  declarations: [
    AuthorityComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    RoleListComponent,
    RoleAddComponent,
  ],
  entryComponents: [UserAddComponent, UserEditComponent, RoleAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule,
    NbDialogModule.forChild(),
    NbIconModule,
    NbInputModule,
    ThemeModule,
    AuthorityRoutingModule,
    NgZorroAntdModule,
  ],
})
export class AuthorityModule {}
