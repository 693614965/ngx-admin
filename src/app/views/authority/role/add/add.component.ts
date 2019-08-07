import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {RoleService} from '../../../../service/role.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class RoleAddComponent implements OnInit {
  @Input() role: any = {};
  title = '提示!';
  validateForm: FormGroup;

  constructor(
    private ref: NbDialogRef<RoleAddComponent>,
    private roleService: RoleService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      id: [this.role.id],
      name: [this.role.name, [Validators.required]],
      code: [this.role.code, [Validators.required]],
      descr: [this.role.descr],
    });
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      if (this.validateForm.value.id) {
        this.update();
      } else {
        this.save();
      }
    }
  }

  save() {
    this.roleService.add(this.validateForm.value).subscribe(resp => {
      console.info(resp);
      if (resp.code === 1) {
        this.notification.create('error', this.title, resp.msg);
      } else {
        this.notification.create('success', this.title, resp.msg);
        this.ref.close(this.validateForm.value);
      }
    });
  }

  update() {
    this.roleService.update(this.validateForm.value).subscribe(resp => {
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
