import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { tap, filter, take, switchMap, map, timeout } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators/catchError';
import { ISeries } from '../model';
import { LoadJsLib } from './store/js-libs';
import { getLib } from './store/js-libs/js-libs.selector';
import { CodeEditorState } from './store';

@Injectable()
export class JsLibsGuard implements CanActivate {
  constructor(private store: Store<CodeEditorState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore('chai.js').pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(path: string): Observable<string> {
    return this.store.select(getLib(path)).pipe(
      tap(chai => {
        if (!chai) {
          this.store.dispatch(new LoadJsLib(path));
        }
      }),
      filter(chai => !!chai),
      take(1),
      timeout(1000)
    );
  }
}
