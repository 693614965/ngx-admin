import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

export interface ResponseBean {
  code: number;
  msg: string;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private httpClient: HttpClient) {}

  public get(url: string, query: any): Observable<any> {
    return this.httpClient
      .get(url, {params: query, headers: this.headers})
      .pipe(
        map(this.handleSuccess),
        catchError(res => this.handleError)
      );
  }

  public post(url: string, data: any): any {
    return this.httpClient.post(url, data, {headers: this.headers}).pipe(
      map(this.handleSuccess),
      catchError(res => this.handleError)
    );
  }

  public put(url: string, data: any): any {
    return this.httpClient.put(url, data, {headers: this.headers}).pipe(
      map(this.handleSuccess),
      catchError(res => this.handleError)
    );
  }

  public delete(url: string): any {
    return this.httpClient.delete(url, {headers: this.headers}).pipe(
      map(this.handleSuccess),
      catchError(res => this.handleError)
    );
  }

  private handleSuccess(resp: ResponseBean) {
    return resp;
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    if (error.status === 400) {
      console.error('请求参数正确');
    }
    if (error.status === 401) {
      console.error('登录失效');
    }
    if (error.status === 404) {
      console.error('请检查路径是否正确');
    }
    if (error.status === 500) {
      console.error('请求的服务器错误');
    }
    return throwError('Something bad happened; please try again later.');
  }
}
