import {Component, OnInit} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogRef,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import {UserService} from '../../../../service/user.service';
@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class UserAddComponent implements OnInit {
  user: any = {};
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'warning';
  title = '提示!';

  constructor(
    private ref: NbDialogRef<UserAddComponent>,
    private userService: UserService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {}

  cancel() {
    this.ref.close();
  }

  submit() {
    console.info(this.user);
    if (this.user.password !== this.user.confirmPassword) {
      this.showToast(this.status, this.title, '密码不一致!');
      return;
    }
    this.userService.save(this.user).subscribe(resp => {
      console.info(resp);
      if (resp.code === 1) {
        this.showToast(this.status, this.title, resp.msg);
      } else {
        this.status = 'success';
        this.showToast(this.status, this.title, resp.msg);
        this.ref.close(this.user);
      }
    });
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
