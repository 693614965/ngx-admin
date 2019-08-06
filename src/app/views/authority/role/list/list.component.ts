import {Component, OnInit} from '@angular/core';
import {NbDialogService,} from '@nebular/theme';
import {RoleService} from '../../../../service/role.service';
import {RoleAddComponent} from '../add/add.component';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class RoleListComponent implements OnInit {
  title = '提示!';
  listOfData = [];
  constructor(
    private dialogService: NbDialogService,
    private roleService: RoleService,
  ) {}

  ngOnInit() {
    this.fetch();
  }

  fetch(): void {
    this.roleService.roles({}).subscribe(resp => {
      console.info(resp);
      this.listOfData = resp.data.content;
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
        // this.showToast(this.status, this.title, resp.msg);
      } else {
        // this.status = 'success';
        // this.showToast(this.status, this.title, resp.msg);
        this.fetch();
        event.source.refresh();
      }
    });
  }

  onEditConfirm(event) {
    this.roleService.update(event.newData).subscribe(resp => {
      if (resp.code === 1) {
        // this.showToast(this.status, this.title, resp.msg);
      } else {
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
          // this.showToast(this.status, this.title, resp.msg);
        } else {
          event.confirm.resolve();
          event.source.refresh();
        }
      });
    } else {
      event.confirm.reject();
    }
  }
}
