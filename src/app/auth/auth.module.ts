import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NbAuthModule} from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
} from '@nebular/theme';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NbCardModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,
    NbAuthModule,
  ],
})
export class AuthModule {}
