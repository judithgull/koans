import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf('topics') !== -1) {
      const authHeader = this.getAuthorizationHeader();
      const authReq = req.clone({
        headers: req.headers.set('authorization', authHeader)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }

  getAuthorizationHeader(): string {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : '';
  }
}
