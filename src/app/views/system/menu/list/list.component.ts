import {Component, OnInit} from '@angular/core';
import {NbDialogService, NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {MenuService} from '../../../../service/menu.service';
import {MenuAddComponent} from '../add/add.component';

export interface FSEntry {
  id?: string;
  code?: string;
  type?: number;
  name?: string;
  path?: string;
  icon?: string;
  sort?: number;
  locale?: string;
  pid?: string;
  label?: string;
  value?: string;
  children?: FSEntry[];
  expanded?: boolean;
}
@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class MenuListComponent implements OnInit {
  customColumn = 'name';
  defaultColumns = ['type', 'path', 'code', 'icon', 'sort', 'actions'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  data: FSEntry[] = [];
  source: NbTreeGridDataSource<FSEntry>;
  getters: NbGetters<FSEntry, FSEntry> = {
    dataGetter: (node: FSEntry) => node,
    childrenGetter: (node: FSEntry) => node.children || undefined,
    expandedGetter: (node: FSEntry) => !!node.expanded,
  };

  constructor(
    private menuService: MenuService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private dialogService: NbDialogService,
  ) {}
  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.menuService.all({}).subscribe(resp => {
      console.info(resp);
      this.data = resp.data;
      this.source = this.dataSourceBuilder.create(this.data, this.getters);
    });
  }

  onAddClick() {
    this.dialogService
      .open(MenuAddComponent, {
        context: {
          menu: {},
          menus: this.data,
        },
      })
      .onClose.subscribe(menu => menu && this.fetch());
  }

  onEditClick(menu: FSEntry) {
    console.info(menu);
    this.dialogService
      .open(MenuAddComponent, {
        context: {
          menu: menu,
          menus: this.data,
        },
      })
      .onClose.subscribe(m => m && this.fetch());
  }

  onRemoveClick(menu: FSEntry) {
    console.info(menu);
  }
}
