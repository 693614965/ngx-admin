import {Component, Input, OnInit} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';
import {UserService} from '../../../../service/user.service';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  @Input() user: any = {};
  @Input() roles: any[] = [];
  title = '提示!';
  validateForm: FormGroup;

  constructor(
    private ref: NbDialogRef<UserEditComponent>,
    private userService: UserService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      id: [this.user.id],
      email: [this.user.email, [Validators.email]],
      phoneNumberPrefix: ['+86'],
      mobile: [this.user.mobile],
      roles: [this.user.roles.map(role => role.id)],
      status: [this.user.status],
      profile: [this.user.profile],
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity(),
    );
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
      if (this.validateForm.value.roles) {
        const roles: any[] = [];
        this.validateForm.value.roles.forEach(role => {
          roles.push({
            id: role,
          });
        });
        this.validateForm.value.roles = roles;
      }
      this.userService.update(this.validateForm.value).subscribe(resp => {
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
}
