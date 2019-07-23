import { Injectable } from '@angular/core';
import {RequestService, ResponseBean} from './request.service';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MenuService {

  constructor(private request: RequestService) { }

  all(params: any): Observable<ResponseBean> {
    return this.request.get(`/api/v1/menu/all`, params);
  }

  add(data: any): Observable<ResponseBean> {
    return this.request.post(`/api/v1/menu/add`, data);
  }

  update(data: any): Observable<ResponseBean> {
    return this.request.put(`/api/v1/menu/update`, data);
  }

  deleteById(id: string): Observable<ResponseBean> {
    return this.request.delete(`/api/v1/menu/delete/${id}`);
  }
}
