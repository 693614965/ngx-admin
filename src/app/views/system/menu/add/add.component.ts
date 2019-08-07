import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {MenuService} from '../../../../service/menu.service';
import {FSEntry} from '../list/list.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class MenuAddComponent implements OnInit {
  @Input() menus: FSEntry[] = [];
  @Input() menu: FSEntry = {};
  validateForm: FormGroup;
  title = '提示!';

  constructor(
    private ref: NbDialogRef<MenuAddComponent>,
    private menuService: MenuService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      id: [this.menu.id],
      type: [this.menu.type || 10, [Validators.required]],
      pid: [this.getPids()],
      name: [this.menu.name],
      path: [this.menu.path],
      icon: [this.menu.icon],
      authCode: [this.menu.authCode],
      orderNo: [this.menu.orderNo],
    });
  }

  getPids() {
    const pids: string[] = [];
    if (this.menu.id) {
      this.getParent(this.menus, this.menu.id, pids);
    }
    return pids.reverse();
  }

  getParent(menus: FSEntry[], id: string, pids: string[]) {
    menus.forEach(menu => {
      if (menu.id === id) {
        if (menu.parent) {
          if (typeof (menu.parent) === 'string') {
            pids.push(menu.parent);
            this.getParent(this.menus, menu.parent, pids);
          } else if (typeof (menu.parent) === 'object') {
            pids.push(menu.parent.id);
            this.getParent(this.menus, menu.parent.id, pids);
          }
        }
      } else {
        if (menu.children) {
          this.getParent(menu.children, id, pids);
        }
      }
    });
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    if (!this.menu.id) {
      this.save();
      console.info(this.validateForm.value);
    } else {
      this.update();
      console.info(this.validateForm.value);
    }
  }

  update() {
    if (this.validateForm.value.pid && this.validateForm.value.pid.length !== 0) {
      this.validateForm.value.parent = {
        id: this.validateForm.value.pid[this.validateForm.value.pid.length - 1],
      };
    }
    this.menuService.update(this.validateForm.value).subscribe(resp => {
      console.info(resp);
      if (resp.code === 1) {
        this.notification.create('error', this.title, resp.msg);
      } else {
        this.notification.create('success', this.title, resp.msg);
        this.ref.close(this.validateForm.value);
      }
    });
  }

  save() {
    if (this.validateForm.value.pid && this.validateForm.value.pid.length !== 0) {
      this.validateForm.value.parent = {
        id: this.validateForm.value.pid[this.validateForm.value.pid.length - 1],
      };
    }
    this.menuService.add(this.validateForm.value).subscribe(resp => {
      console.info(resp);
      if (resp.code === 1) {
        this.notification.create('error', this.title, resp.msg);
      } else {
        this.notification.create('success', this.title, resp.msg);
        this.ref.close(this.validateForm.value);
      }
    });
  }
}
