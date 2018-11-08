import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { GO_TO_EXERCISE, GoToExercise } from './series-routing.action';
import { tap, map, switchMap } from 'rxjs/operators';
import {SeriesQueries} from '../series';
import { AppState } from '..';

@Injectable()
export class SeriesRouterEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router
  ) { }

  @Effect({ dispatch: false })
  navigateToExercise$ = this.actions$.ofType(GO_TO_EXERCISE).pipe(
    map((a: GoToExercise) => a.id),
    switchMap(id => {
      return this.store.select(SeriesQueries.selectedSeries).pipe(
        tap(s => {
          if (s) {
            this.router.navigate(['series', s._id, 'e', id]);
          }
        })
      );
    })
  );
}
