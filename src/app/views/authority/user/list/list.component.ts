import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../service/user.service';
import {LocalDataSource} from 'ng2-smart-table';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import {
  RenderStatusComponent,
  RenderSuperAdminComponent,
} from '../render/render.component';

import {UserAddComponent} from '../add/add.component';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class UserListComponent implements OnInit {
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
      userName: {
        title: '账号',
        editable: false,
      },
      email: {
        title: '邮箱',
      },
      mobile: {
        title: '手机',
      },
      status: {
        title: '使用状态',
        type: 'custom',
        renderComponent: RenderStatusComponent,
        editor: {
          type: 'list',
          config: {
            list: [{value: 0, title: '正常'}, {value: 1, title: '禁用'}],
          },
        },
      },
      lastLogin: {
        title: '登录日期',
        editable: false,
      },
      isSuperAdmin: {
        title: '超级管理员',
        type: 'custom',
        renderComponent: RenderSuperAdminComponent,
        editor: {
          type: 'list',
          config: {
            list: [{value: true, title: '是'}, {value: false, title: '否'}],
          },
        },
      },
      addOn: {
        title: '创建日期',
        editable: false,
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'warning';
  title = '提示!';
  constructor(
    private userService: UserService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.userService.users({}).subscribe(resp => {
      console.info(resp);
      this.source.load(resp.data.records);
    });
  }

  onAddClick() {
    this.dialogService
      .open(UserAddComponent, {})
      .onClose.subscribe(user => user && this.fetch());
  }

  onCreateConfirm(event) {
    this.userService.save(event.newData).subscribe(resp => {
      if (resp.code === 1) {
        this.showToast(this.status, this.title, resp.msg);
      } else {
        this.status = 'success';
        this.showToast(this.status, this.title, resp.msg);
        this.fetch();
        event.source.refresh();
      }
    });
  }

  onEditConfirm(event) {
    this.userService.update(event.newData).subscribe(resp => {
      if (resp.code === 1) {
        this.showToast(this.status, this.title, resp.msg);
      } else {
        this.status = 'success';
        this.showToast(this.status, this.title, resp.msg);
        this.fetch();
        event.source.refresh();
      }
    });
  }

  onDeleteConfirm(event) {
    if (window.confirm('你确定要删除此账号吗?')) {
      console.info(event.data);
      this.userService.deleteById(event.data.id).subscribe(resp => {
        if (resp.code === 1) {
          this.showToast(this.status, this.title, resp.msg);
        } else {
          this.status = 'success';
          this.showToast(this.status, this.title, resp.msg);
          event.confirm.resolve();
          event.source.refresh();
        }
      });
    } else {
      event.confirm.reject();
    }
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';

    this.toastrService.show(body, titleContent, config);
  }
}
