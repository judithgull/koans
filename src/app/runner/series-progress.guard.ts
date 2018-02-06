import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { State, LoadSeries, getSeriesEntities } from '../store';
import { tap, filter, take, switchMap, map, timeout } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators/catchError';
import { ISeries, SeriesProgress } from '../common/model';
import {
  RunnerState,
  getSeriesUserStates,
  getSelectedSeriesState,
  InitSeriesProgress
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
