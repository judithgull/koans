import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as sa from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SeriesService } from '../../../common/series.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SeriesEffects {
  constructor(
    private actions$: Actions,
    private seriesServies: SeriesService
  ) {}

  @Effect()
  loadSeries$ = this.actions$.ofType(sa.LOAD_SERIES).pipe(
    switchMap((a: sa.LoadSeries) => {
      return this.seriesServies
        .get(a.id)
        .pipe(
          map(series => new sa.LoadSeriesSuccess(series)),
          catchError(error => of(new sa.LoadSeriesFail(error)))
        );
    })
  );
}
