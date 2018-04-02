import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  LoadLibSuccess,
  LoadLibError,
  LOAD_LIB,
  LoadJsLib
} from './js-libs.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { JsLibsService } from '../../../common';

@Injectable()
export class JsLibsEffects {
  constructor(private actions$: Actions, private service: JsLibsService) {}

  @Effect()
  loadJsLib$ = this.actions$.ofType(LOAD_LIB).pipe(
    map((a: LoadJsLib) => a.path),
    switchMap(path => {
      return this.service
        .get(path)
        .pipe(
          map(chai => new LoadLibSuccess(path, chai)),
          catchError(error => of(new LoadLibError(error)))
        );
    })
  );

  // TODO there should be a toast on error
}
