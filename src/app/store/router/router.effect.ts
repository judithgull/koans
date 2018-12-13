import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GO, Go, HOME } from './router.action';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router) { }

  @Effect({ dispatch: false })
  navigate$ = this.actions$
    .pipe(
      ofType(GO),
      map((a: Go) => a.payload),
      tap(({ path, query: queryParams, extras }) => {
        this.router.navigate(path, { queryParams, ...extras });
      })
    );

  @Effect()
  home$ = this.actions$
    .pipe(
      ofType(HOME),
      map(() => new Go({ path: ['/'] }))
    );
}
