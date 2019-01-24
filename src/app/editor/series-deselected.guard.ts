import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { SeriesFacade } from '../store';
import { Observable, of } from 'rxjs';
import { ISeries } from '../model';
import {
  tap,
  switchMap,
  catchError,
  filter,
  take,
  timeout
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeriesDeselectedGuard implements CanActivate {
  constructor(private seriesFacade: SeriesFacade) {}

  canActivate(): Observable<boolean> {
    return this.ensureDeselected().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  ensureDeselected(): Observable<ISeries> {
    return this.seriesFacade.selectedSeries$.pipe(
      tap(series => {
        if (series) {
          this.seriesFacade.deselectSeries();
        }
      }),
      filter(s => !s),
      take(1),
      timeout(1000)
    );
  }
}
