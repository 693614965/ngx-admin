import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../service/user.service';
import {RoleService} from '../../../../service/role.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';

import {NbDialogService} from '@nebular/theme';

import {UserAddComponent} from '../add/add.component';
import {UserEditComponent} from '../edit/edit.component';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class UserListComponent implements OnInit {
  title = '提示!';
  listOfData = [];
  roles = [];

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private dialogService: NbDialogService,
  ) {
  }

  ngOnInit() {
    this.fetch();
    this.fetchRoles();
  }

  fetch() {
    this.userService.users({}).subscribe(resp => {
      console.info(resp);
      this.listOfData = resp.data.content;
    });
  }

  fetchRoles = () => {
    this.roleService.roles({}).subscribe(resp => {
      console.info(resp);
      this.roles = resp.data.content;
    });
  }

  onAddClick() {
    this.dialogService
      .open(UserAddComponent, {
        context: {
          roles: this.roles,
        },
      })
      .onClose.subscribe(user => user && this.fetch());
  }

  onEditClick(row) {
    this.dialogService
      .open(UserEditComponent, {
        context: {
          roles: this.roles,
          user: row,
        },
      })
      .onClose.subscribe(user => user && this.fetch());
  }

  onRemoveClick(row) {
    this.modalService.confirm({
      nzTitle: '提示',
      nzContent: '你确定要删除此记录吗？',
      nzOkText: '删除',
      nzCancelText: '取消',
      nzOnOk: () => {
        this.userService.deleteById(row.id).subscribe(resp => {
          console.info(resp);
          if (resp.code === 1) {
            this.notification.create('error', this.title, resp.msg);
          } else {
            this.notification.create('success', this.title, resp.msg);
            this.fetch();
          }
        });
      },
    });
  }
}
