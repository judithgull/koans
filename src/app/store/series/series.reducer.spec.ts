import { SeriesQueries } from './series.reducer';
import {
  SeriesQuerySuccess,
  AppState,
  reducers,
} from '../index';

import { Store, StoreModule } from '@ngrx/store';
import { mockSeries } from '../../common/test';
import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { SeriesDeleteSuccess, SeriesSelectAction, ExerciseSelectAction } from './series.action';

describe('Series Reducer and Selectors', () => {
  let store: Store<AppState>;
  const subs: Subscription[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers)
      ]
    });

    store = TestBed.get(Store);
  });

  afterEach(() => {
    subs.forEach(s => s.unsubscribe());
  });

  describe('all series', () => {

    it('is empty initially', done => {
      const all$ = store.select(SeriesQueries.all);

      subs.push(all$.subscribe(
        value => {
          expect(value).toEqual([]);
          done();
        }));
    });

    it('returns all series, if series are loaded', done => {
      const all$ = store.select(SeriesQueries.all);
      store.dispatch(new SeriesQuerySuccess(mockSeries));

      subs.push(all$.subscribe(
        value => {
          expect(value).toEqual(mockSeries);
          done();
        }));
    });

  });

  describe('series by authorId', () => {

    it('returns no series, if author is not found', done => {
      const series$ = store.select(SeriesQueries.byAuthorId('unknown'));
      store.dispatch(new SeriesQuerySuccess(mockSeries));

      subs.push(series$.subscribe(
        value => {
          expect(value).toEqual([]);
          done();
        }));
    });

    it('returns series with same author', done => {
      const series$ = store.select(SeriesQueries.byAuthorId(mockSeries[0].authorId));
      store.dispatch(new SeriesQuerySuccess(mockSeries));

      subs.push(series$.subscribe(
        value => {
          expect(value).toEqual(mockSeries);
          done();
        }));
    });
  });

  describe('series by id', () => {

    it('returns no series, if id is not found', done => {
      const series$ = store.select(SeriesQueries.byId('unknown'));
      store.dispatch(new SeriesQuerySuccess(mockSeries));

      subs.push(series$.subscribe(
        value => {
          expect(value).toEqual(undefined);
          done();
        }));
    });

    it('returns series with the given id', done => {
      const id = mockSeries[0]._id;
      const series$ = store.select(SeriesQueries.byId('' + id));
      store.dispatch(new SeriesQuerySuccess(mockSeries));

      subs.push(series$.subscribe(
        value => {
          expect(value).toEqual(mockSeries[0]);
          done();
        }));
    });
  });


  describe('delete', () => {

    it('has no effect, if the deleted object is not found', done => {
      const all$ = store.select(SeriesQueries.all);

      store.dispatch(new SeriesDeleteSuccess('' + mockSeries[0]._id));

      subs.push(all$.subscribe(
        value => {
          expect(value).toEqual([]);
          done();
        }));
    });

    it('deletes series from the store', done => {
      const all$ = store.select(SeriesQueries.all);

      store.dispatch(new SeriesQuerySuccess(mockSeries));
      store.dispatch(new SeriesDeleteSuccess('' + mockSeries[0]._id));

      subs.push(all$.subscribe(
        value => {
          expect(value).toEqual([mockSeries[1]]);
          done();
        }));
    });
  });

  describe('select', () => {

    it('selects undefined, if nothing is selected', done => {
      const selectedId$ = store.select(SeriesQueries.selectedSeriesId);
      subs.push(selectedId$.subscribe(
        value => {
          expect(value).toBeUndefined();
          done();
        }));
    });

    it('selects a seriesId', done => {
      const selectedId$ = store.select(SeriesQueries.selectedSeriesId);
      const seriesId = 'a';
      store.dispatch(new SeriesSelectAction(seriesId));

      subs.push(selectedId$.subscribe(
        value => {
          expect(value).toEqual(seriesId);
          done();
        }));
    });

    it('selects undefined, if nothing is selected', done => {
      const selected$ = store.select(SeriesQueries.selectedSeries);
      subs.push(selected$.subscribe(
        value => {
          expect(value).toBeUndefined();
          done();
        }));
    });

    it('selects a series', done => {
      const selected$ = store.select(SeriesQueries.selectedSeries);
      store.dispatch(new SeriesQuerySuccess(mockSeries));
      const seriesId = mockSeries[1]._id;
      store.dispatch(new SeriesSelectAction('' + seriesId));
      subs.push(selected$.subscribe(
        value => {
          expect(value).toEqual(mockSeries[1]);
          done();
        }));
    });

    it('selects an exerciseId', done => {
      const selectedExerciseNr$ = store.select(SeriesQueries.selectedExerciseNr);
      const exerciseNr = 1;
      store.dispatch(new ExerciseSelectAction(exerciseNr));
      subs.push(selectedExerciseNr$.subscribe(
        value => {
          expect(value).toEqual(exerciseNr);
          done();
        }));
    });

    it('does not select anything, if exercise is not found', done => {
      const selectedExercise$ = store.select(SeriesQueries.selectedExercise);
      const exerciseNr = 1;
      store.dispatch(new ExerciseSelectAction(exerciseNr));
      subs.push(selectedExercise$.subscribe(
        value => {
          expect(value).toBeUndefined();
          done();
        }));
    });

    it('selects an exercise', done => {
      const selectedExercise$ = store.select(SeriesQueries.selectedExercise);
      const series = mockSeries[1];
      const seriesId = series._id;
      const exercise = series.items[0];
      const exerciseNr = +exercise.sortOrder;
      store.dispatch(new SeriesQuerySuccess(mockSeries));
      store.dispatch(new SeriesSelectAction('' + seriesId));
      store.dispatch(new ExerciseSelectAction(exerciseNr));
      subs.push(selectedExercise$.subscribe(
        value => {
          expect(value).toEqual(exercise);
          done();
        }));
    });
  });
});
