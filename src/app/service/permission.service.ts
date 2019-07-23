import { Injectable } from '@angular/core';
import {RequestService, ResponseBean} from './request.service';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private request: RequestService) { }

  page(params: any): Observable<ResponseBean> {
    return this.request.get(`/api/v1/permission/page`, params);
  }
}
