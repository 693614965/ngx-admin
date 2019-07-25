import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbSelectModule,
  NbRadioModule,
  NbTreeGridModule,
  NbInputModule,
} from '@nebular/theme';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ThemeModule} from '../../@theme/theme.module';

import {SystemRoutingModule} from './system-routing.module';

import {SystemComponent} from './system.component';
import {MenuListComponent} from './menu/list/list.component';
import {MenuAddComponent} from './menu/add/add.component';
import {PermissionListComponent} from './permission/list/list.component';
import {RenderNameComponent} from './permission/render/render.component';

@NgModule({
  declarations: [
    SystemComponent,
    MenuListComponent,
    MenuAddComponent,
    PermissionListComponent,
    RenderNameComponent,
  ],
  entryComponents: [MenuAddComponent, RenderNameComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule,
    NgZorroAntdModule,
    NbDialogModule.forChild(),
    NbIconModule,
    NbSelectModule,
    NbRadioModule,
    NbInputModule,
    ThemeModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    SystemRoutingModule,
  ],
})
export class SystemModule {}
