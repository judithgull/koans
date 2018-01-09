import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = this.getAuthorizationHeader();
    const authReq = req.clone({ headers: req.headers.set('authorization', authHeader) });
    return next.handle(authReq);
  }

  getAuthorizationHeader(): string {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : '';
  }

}
