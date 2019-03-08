import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.isAuthNeeded(req.url)) {
      const authHeader = this.getAuthorizationHeader();
      const authReq = req.clone({
        headers: req.headers.set('authorization', authHeader)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }

  isAuthNeeded(url: string) {
    return url.indexOf('topics') !== -1 || url.indexOf('users');
  }

  getAuthorizationHeader(): string {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : '';
  }
}
