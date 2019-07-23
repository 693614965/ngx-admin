import {Injectable, Inject} from '@angular/core';
import {NbTokenService, NB_AUTH_INTERCEPTOR_HEADER} from '@nebular/auth';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: NbTokenService,
    @Inject(NB_AUTH_INTERCEPTOR_HEADER)
    protected headerName: string = 'Authorization',
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): import('rxjs').Observable<HttpEvent<any>> {
    this.tokenService.get().subscribe(token => {
      console.info(token.getValue());
      req = req.clone({
        setHeaders: {
          [this.headerName]: token.getValue(),
        },
      });
    });
    return next.handle(req);
  }
}
