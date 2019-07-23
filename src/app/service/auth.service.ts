import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RequestService} from './request.service';
import {stringify} from 'qs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private request: RequestService) {}

  login(params: any): Observable<any> {
    return this.request.post(`/api/v1/auth/login?${stringify(params)}`, null);
  }
}
