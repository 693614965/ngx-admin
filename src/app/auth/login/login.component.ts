import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NbAuthSimpleToken, NbTokenService} from '@nebular/auth';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: any = {type: 'account'};
  redirectDelay: number = 1000;
  showMessages: any = {};
  submitted: boolean = false;
  rememberMe = true;
  constructor(
    private router: Router,
    private tokenService: NbTokenService,
    private authService: AuthService,
  ) {}

  ngOnInit() {}

  login() {
    console.info(this.user);
    this.submitted = true;
    this.authService.login(this.user).subscribe(resp => {
      console.info(resp);
      this.submitted = false;
      if (resp.code === 1) {
        this.showMessages = resp.msg;
      } else {
        this.showMessages = {};
        this.tokenService.set(
          new NbAuthSimpleToken(resp.data.token, 'token', new Date()),
        );
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return true;
  }
}
