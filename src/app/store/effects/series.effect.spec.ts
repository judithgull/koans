import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { TestBed } from '@angular/core/testing';

import { mockSeries } from '../../common/test/index';
import {
  QuerySeries,
  QuerySeriesSuccess,
  CreateSeries,
  CreateSeriesSuccess,
  UpdateSeriesSuccess,
  UpdateSeries,
  DeleteSeries,
  DeleteSeriesSuccess,
  Home
} from '../index';
import { SeriesService } from '../../common/series.service';
import { SeriesEffects } from './series.effect';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { hot, cold } from 'jasmine-marbles';
import { TestActions, getActions } from '../test/test.actions';

describe('SeriesEffects', () => {
  let actions$: TestActions;
  let service: SeriesService;
  let effects: SeriesEffects;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SeriesService,
        SeriesEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(SeriesService);
    effects = TestBed.get(SeriesEffects);

    spyOn(service, 'getSeries').and.returnValue(of(mockSeries));
    spyOn(service, 'create').and.returnValue(of(mockSeries[0]));
    spyOn(service, 'update').and.returnValue(of(mockSeries[0]));
    spyOn(service, 'delete').and.returnValue(of({ id: mockSeries[0]._id }));
  });

  describe('querySeries$', () => {
    it('should return a collection from QuerySeriesSuccess', () => {
      const action = new QuerySeries({});

      actions$.stream = hot('-a', { a: action });

      const completionAction = new QuerySeriesSuccess(mockSeries);
      const expected = cold('-b', { b: completionAction });

      expect(effects.querySeries$).toBeObservable(expected);
    });
  });

  describe('createSeries$', () => {
    it('should create a series from CreateSeriesSuccess', () => {
      const action = new CreateSeries(mockSeries[0]);

      actions$.stream = hot('-a', { a: action });

      const completionAction = new CreateSeriesSuccess(mockSeries[0]);
      const expected = cold('-b', { b: completionAction });
      expect(effects.createSeries$).toBeObservable(expected);
    });
  });

  describe('updateSeries$', () => {
    it('should update a series from UpdateSeries', () => {
      const action = new UpdateSeries(mockSeries[0]);

      actions$.stream = hot('-a', { a: action });

      const completionAction = new UpdateSeriesSuccess(mockSeries[0]);
      const expected = cold('-b', { b: completionAction });
      expect(effects.updateSeries$).toBeObservable(expected);
    });
  });

  describe('deleteSeries$', () => {
    it('should delete a series from DeleteSeries', () => {
      const action = new DeleteSeries(mockSeries[0]._id + '');

      actions$.stream = hot('-a', { a: action });

      const completionAction = new DeleteSeriesSuccess(mockSeries[0]._id + '');
      const expected = cold('-b', { b: completionAction });
      expect(effects.deleteSeries$).toBeObservable(expected);
    });
  });

  describe('homeOnSuccess$', () => {
    it('should navigate home on CreateSeriesSuccess', () => {
      const action = new CreateSeriesSuccess(mockSeries[0]);
      actions$.stream = hot('-a', { a: action });

      const completionAction = new Home();
      const expected = cold('-b', { b: completionAction });
      expect(effects.homeOnSuccess$).toBeObservable(expected);
    });
  });
});
