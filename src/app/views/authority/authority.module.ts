import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';

import {ThemeModule} from '../../@theme/theme.module';
import {AuthorityRoutingModule} from './authority-routing.module';
import {AuthorityComponent} from './authority.component';
import {UserListComponent} from './user/list/list.component';
import {
  RenderStatusComponent,
  RenderSuperAdminComponent,
} from './user/render/render.component';
import {UserAddComponent} from './user/add/add.component';
import {RoleListComponent} from './role/list/list.component';
import {RoleAddComponent} from './role/add/add.component';

@NgModule({
  declarations: [
    AuthorityComponent,
    UserListComponent,
    RenderStatusComponent,
    RenderSuperAdminComponent,
    UserAddComponent,
    RoleListComponent,
    RoleAddComponent,
  ],
  entryComponents: [
    RenderStatusComponent,
    RenderSuperAdminComponent,
    UserAddComponent,
    RoleAddComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbButtonModule,
    NbCardModule,
    NbDialogModule.forChild(),
    NbIconModule,
    NbInputModule,
    ThemeModule,
    AuthorityRoutingModule,
    Ng2SmartTableModule,
  ],
})
export class AuthorityModule {}
