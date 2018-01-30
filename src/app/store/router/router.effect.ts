import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { GO, Go, BACK, Back } from './router.action';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(GO).pipe(
    map((action: Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  back$ = this.actions$.ofType(BACK).pipe(
    tap(() => {
      this.location.back();
    })
  );
}
