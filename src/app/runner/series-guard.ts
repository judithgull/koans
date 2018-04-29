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
import { ISeries } from '../model';

@Injectable()
export class SeriesExistsGuard implements CanActivate {
  constructor(private store: Store<State>) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.id).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(id: string): Observable<ISeries> {
    return this.store.select(getSeriesEntities).pipe(
      map(entites => entites[id]),
      tap(series => {
        if (!series) {
          this.store.dispatch(new LoadSeries(id));
        }
      }),
      filter(series => !!series),
      take(1),
      timeout(1000)
    );
  }
}
