import { Injectable } from '@angular/core';
import {RequestService, ResponseBean} from './request.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private request: RequestService) { }

  users(params: any): Observable<ResponseBean> {
    return this.request.get(`/api/v1/user/page`, params);
  }

  save(data: any): Observable<ResponseBean> {
    return this.request.post(`/api/v1/user/save`, data);
  }

  update(data: any): Observable<ResponseBean> {
    return this.request.put(`/api/v1/user/update`, data);
  }

  deleteById(id: string): Observable<ResponseBean> {
    return this.request.delete(`/api/v1/user/delete/${id}`);
  }

  currentUser(): Observable<ResponseBean> {
    return this.request.get('/api/v1/user/currentUser', null);
  }
}
