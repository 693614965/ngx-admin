import {Component} from '@angular/core';
import {MENU_ITEMS} from './views-menu';

@Component({
  selector: 'ngx-views',
  styleUrls: ['views.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class ViewsComponent {
    menu = MENU_ITEMS;
}
