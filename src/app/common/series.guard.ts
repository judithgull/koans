import {
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SeriesFacade, SeriesSelectAction } from '../store';
import { tap, filter, take, switchMap, map, timeout } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators/catchError';
import { ISeries } from '../model';

@Injectable()
export class SeriesExistsGuard implements CanActivate {
  constructor(private seriesFacade:SeriesFacade) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const seriesId = route.params.id;
    this.seriesFacade.selectSeries(seriesId);
    return this.checkStore(seriesId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(id: string): Observable<ISeries> {
    return this.seriesFacade.getById(id).pipe(
      tap(series => {
        if (!series) {
          this.seriesFacade.load(id);
        }
      }),
      filter(series => !!series),
      take(1),
      timeout(1000)
    );
  }
}
