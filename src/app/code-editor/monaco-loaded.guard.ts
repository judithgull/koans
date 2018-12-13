import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { MonacoLoaderService } from '../code-editor/monaco-loader.service';
import { filter, take, timeout } from 'rxjs/operators';

@Injectable()
export class MonacoLoadedGuard implements CanActivate {
  constructor(private service: MonacoLoaderService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.service.isMonacoLoaded.pipe(
      filter(value => !!value),
      take(1),
      timeout(5000)
    );
  }
}
