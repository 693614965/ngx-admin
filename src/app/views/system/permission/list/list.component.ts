import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../../../service/menu.service';
import {PermissionService} from '../../../../service/permission.service';
import {LocalDataSource} from 'ng2-smart-table';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import {RenderNameComponent} from '../render/render.component';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class PermissionListComponent implements OnInit {
  menus: any[] = [];
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      columnTitle: '操作',
      position: 'right',
    },
    hideSubHeader: true,
    columns: {
      menuId: {
        title: '菜单',
        type: 'custom',
        renderComponent: RenderNameComponent,
        editor: {
          type: 'completer',
          config: {
            completer: {
              data: [{id: 10, name: 'Nick', email: 'rey@karina.biz'}],
              searchFields: 'name',
              titleField: 'name',
              descriptionField: 'name',
            },
            // list: [{value: 0, title: '正常'}, {value: 1, title: '禁用'}],
          },
        },
      },
      name: {
        title: '名称',
      },
      code: {
        title: '编码',
      },
      url: {
        title: '地址',
      },
      sort: {
        title: '序号',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private menuService: MenuService,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    this.fetch();
    this.fetchMenus();
  }

  fetch(): void {
    this.permissionService.page({}).subscribe(resp => {
      console.info(resp);
      this.source.load(resp.data.records);
    });
  }

  fetchMenus() {
    this.menuService.all({}).subscribe(resp => {
      this.menus = resp.data;
    });
  }

  onEditConfirm(event) {
    console.info(event.newData);
  }
}
