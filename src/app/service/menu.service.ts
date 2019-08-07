import {Injectable} from '@angular/core';
import {RequestService, ResponseBean} from './request.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  constructor(private request: RequestService) { }

  list(params: any): Observable<ResponseBean> {
    return this.request.get(`/api/v1/menu/list`, params);
  }

  add(data: any): Observable<ResponseBean> {
    return this.request.post(`/api/v1/menu/save`, data);
  }

  update(data: any): Observable<ResponseBean> {
    return this.request.put(`/api/v1/menu/update`, data);
  }

  deleteById(id: string): Observable<ResponseBean> {
    return this.request.delete(`/api/v1/menu/delete/${id}`);
  }
}
