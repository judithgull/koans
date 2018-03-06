import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { filter, map, switchMap, take, tap, timeout } from 'rxjs/operators';
import { catchError } from 'rxjs/operators/catchError';

import { SeriesProgress } from '../model';
import { getSeriesEntities, LoadSeries, State } from '../store';
import {
  getSelectedSeriesState,
  InitSeriesProgress,
  RunnerState
} from './store';

@Injectable()
export class SeriesProgressExistsGuard implements CanActivate {
  constructor(
    private store: Store<State>,
    private runnerStore: Store<RunnerState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.id).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(id: string): Observable<SeriesProgress> {
    return this.store.select(getSeriesEntities).pipe(
      map(entites => entites[id]),
      switchMap(series => {
        return this.runnerStore.select(getSelectedSeriesState).pipe(
          tap(userState => {
            if (!series) {
              this.store.dispatch(new LoadSeries(id));
            } else if (!userState) {
              this.store.dispatch(new InitSeriesProgress(series));
            }
          })
        );
      }),
      filter(userState => !!userState),
      take(1),
      timeout(1000)
    );
  }
}
