import { Injectable } from '@angular/core';
import {RequestService, ResponseBean} from './request.service';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RoleService {

  constructor(private request: RequestService) { }


  roles(params: any): Observable<ResponseBean> {
    return this.request.get(`/api/v1/role/page`, params);
  }

  add(data: any): Observable<ResponseBean> {
    return this.request.post(`/api/v1/role/add`, data);
  }

  update(data: any): Observable<ResponseBean> {
    return this.request.put(`/api/v1/role/update`, data);
  }

  deleteById(id: string): Observable<ResponseBean> {
    return this.request.delete(`/api/v1/role/delete/${id}`);
  }
}
