import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

const routes: Routes = [
  {
    path: 'views',
    loadChildren: () => import('./views/views.module').then(m => m.ViewsModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // component: NbAuthComponent,
    // children: [
    //   {
    //     path: '',
    //     component: NbLoginComponent,
    //   },
    //   {
    //     path: 'login',
    //     component: NbLoginComponent,
    //   },
    //   {
    //     path: 'register',
    //     component: NbRegisterComponent,
    //   },
    //   {
    //     path: 'logout',
    //     component: NbLogoutComponent,
    //   },
    //   {
    //     path: 'request-password',
    //     component: NbRequestPasswordComponent,
    //   },
    //   {
    //     path: 'reset-password',
    //     component: NbResetPasswordComponent,
    //   },
    // ],
  },
  {path: '', redirectTo: 'views', pathMatch: 'full'},
  {path: '**', redirectTo: 'views'},
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
