import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import {RoleService} from '../../../../service/role.service';
import {RoleAddComponent} from '../add/add.component';
@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class RoleListComponent implements OnInit {
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
      roleName: {
        title: '角色名称',
      },
      roleCode: {
        title: '角色编码',
      },
      descr: {
        title: '角色描述',
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
    private dialogService: NbDialogService,
    private roleService: RoleService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.fetch();
  }

  fetch(): void {
    this.roleService.roles({}).subscribe(resp => {
      console.info(resp);
      this.source.load(resp.data.records);
    });
  }

  onAddClick() {
    this.dialogService
      .open(RoleAddComponent, {})
      .onClose.subscribe(role => role && this.fetch());
  }

  onCreateConfirm(event) {
    this.roleService.add(event.newData).subscribe(resp => {
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
    this.roleService.update(event.newData).subscribe(resp => {
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
      this.roleService.deleteById(event.data.id).subscribe(resp => {
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
