import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SeriesLoadRequest,
  SeriesQueryRequest,
  SeriesDeleteRequest,
  SeriesUpdateRequest,
  SeriesCreateRequest,
  SeriesSelectAction,
  ExerciseSelectAction,
  SeriesDeselectAction
} from './series.action';
import { Observable } from 'rxjs';
import { ISeries, SearchParams, Exercise } from '../../model';
import { SeriesQueries } from './series.reducer';
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root'
})
export class SeriesFacade {
  allSeries$: Observable<ISeries[]> = this.store.select(SeriesQueries.all);
  selectedSeries$: Observable<ISeries> = this.store.select(
    SeriesQueries.selectedSeries
  );
  selectedExercise$: Observable<Exercise> = this.store.select(
    SeriesQueries.selectedExercise
  );

  constructor(private store: Store<AppState>) {}

  getByAuthorId(authorId: string): Observable<ISeries[]> {
    return this.store.select(SeriesQueries.byAuthorId(authorId));
  }

  getById(id: string): Observable<ISeries> {
    return this.store.select(SeriesQueries.byId(id));
  }

  load(seriesId: string) {
    this.store.dispatch(new SeriesLoadRequest(seriesId));
  }

  selectSeries(seriesId: string) {
    this.store.dispatch(new SeriesSelectAction(seriesId));
  }

  deselectSeries() {
    this.store.dispatch(new SeriesDeselectAction());
  }

  selectExercise(exerciseNr: number) {
    this.store.dispatch(new ExerciseSelectAction(exerciseNr));
  }

  search(params: SearchParams) {
    this.store.dispatch(new SeriesQueryRequest(params));
  }

  upsert(series: ISeries) {
    this.store.dispatch(
      series.id
        ? new SeriesUpdateRequest(series)
        : new SeriesCreateRequest(series)
    );
  }

  remove(seriesId: string) {
    this.store.dispatch(new SeriesDeleteRequest(seriesId));
  }
}
