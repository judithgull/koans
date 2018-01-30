import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { GO, Go, HOME } from './router.action';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(GO).pipe(
    map((action: Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect()
  home$ = this.actions$.ofType(HOME).pipe(map(() => new Go({ path: ['/'] })));
}
