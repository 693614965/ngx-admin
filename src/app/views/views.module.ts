import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { ViewsComponent } from './views.component';
import { ViewsRoutingModule } from './views-routing.module';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';

@NgModule({
  declarations: [ViewsComponent],
  imports: [
    ViewsRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
  ],
})
export class ViewsModule { }
