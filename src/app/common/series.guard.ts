import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { SeriesFacade } from '../store';
import {
  tap,
  filter,
  take,
  switchMap,
  timeout,
  catchError
} from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ISeries } from '../model';

@Injectable()
export class SeriesExistsGuard implements CanActivate {
  constructor(private seriesFacade: SeriesFacade) {}

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
