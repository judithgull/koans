import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';

import { mockSeries } from '../../common/test/index';
import {
  SeriesQueryRequest,
  SeriesQuerySuccess,
  SeriesCreateRequest,
  SeriesCreateSuccess,
  SeriesUpdateSuccess,
  SeriesUpdateRequest,
  SeriesDeleteRequest,
  SeriesDeleteSuccess,
  SeriesLoadSuccess,
  Home,
  SeriesError,
  ModelValueChange
} from '../index';
import { SeriesService } from '../../common/series.service';
import { SeriesEffects } from './series.effect';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/observable/of';
import { hot, cold } from 'jasmine-marbles';
import { TestActions, getActions } from '../test/test.actions';
import { ToastrService } from 'ngx-toastr';
import { ModelState, ProgrammingLanguage, ExerciseKey } from '../../model';

class MockToastrService {
  // tslint:disable-next-line:no-empty
  error(message: string) { }
}

describe('SeriesEffects', () => {
  let actions$: TestActions;
  let service: SeriesService;
  let effects: SeriesEffects;
  let toastr: ToastrService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SeriesService,
        SeriesEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ToastrService, useClass: MockToastrService }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(SeriesService);
    effects = TestBed.get(SeriesEffects);
    toastr = TestBed.get(ToastrService);

    spyOn(service, 'getSeries').and.returnValue(of(mockSeries));
    spyOn(service, 'create').and.returnValue(of(mockSeries[0]));
    spyOn(service, 'update').and.returnValue(of(mockSeries[0]));
    spyOn(service, 'delete').and.returnValue(of({ id: mockSeries[0]._id }));
    spyOn(toastr, 'error');
  });

  describe('querySeries$', () => {
    it('should return a collection from QuerySeriesSuccess', () => {
      const action = new SeriesQueryRequest({});

      actions$.stream = hot('-a', { a: action });

      const completionAction = new SeriesQuerySuccess(mockSeries);
      const expected = cold('-b', { b: completionAction });

      expect(effects.querySeries$).toBeObservable(expected);
    });
  });

  describe('createSeries$', () => {
    it('should create a series from CreateSeriesSuccess', () => {
      const action = new SeriesCreateRequest(mockSeries[0]);

      actions$.stream = hot('-a', { a: action });

      const completionAction = new SeriesCreateSuccess(mockSeries[0]);
      const expected = cold('-b', { b: completionAction });
      expect(effects.createSeries$).toBeObservable(expected);
    });
  });

  describe('updateSeries$', () => {
    it('should update a series from UpdateSeries', () => {
      const action = new SeriesUpdateRequest(mockSeries[0]);

      actions$.stream = hot('-a', { a: action });

      const completionAction = new SeriesUpdateSuccess(mockSeries[0]);
      const expected = cold('-b', { b: completionAction });
      expect(effects.updateSeries$).toBeObservable(expected);
    });
  });

  describe('deleteSeries$', () => {
    it('should delete a series from DeleteSeries', () => {
      const action = new SeriesDeleteRequest(mockSeries[0]._id + '');

      actions$.stream = hot('-a', { a: action });

      const completionAction = new SeriesDeleteSuccess(mockSeries[0]._id + '');
      const expected = cold('-b', { b: completionAction });
      expect(effects.deleteSeries$).toBeObservable(expected);
    });
  });

  describe('homeOnSuccess$', () => {
    it('should navigate home on CreateSeriesSuccess', () => {
      const action = new SeriesCreateSuccess(mockSeries[0]);
      actions$.stream = hot('-a', { a: action });

      const completionAction = new Home();
      const expected = cold('-b', { b: completionAction });
      expect(effects.homeOnSuccess$).toBeObservable(expected);
    });
  });

  describe('seriesErrors$', () => {
    it('should display errors', () => {
      const message = 'my message';
      const action = new SeriesError(message);

      actions$.stream = hot('-a', { a: action });

      const expected = cold('-b', { b: action.payload });
      expect(effects.seriesErrors$).toBeObservable(expected);
      expect(toastr.error).toHaveBeenCalledWith(message);
    });
  });



  describe('initModel$', () => {
    it('should init model series load success', () => {
      const series = mockSeries[0];
      const action = new SeriesLoadSuccess(series);

      actions$.stream = hot('-a', { a: action });

      const getModelValueChange = (sortCode: number) => {
        const key0 = new ExerciseKey(series._id, sortCode);
        const modelState: ModelState = {
          id: key0.exercisePath,
          versionId: 1,
          progLang: ProgrammingLanguage.typescript,
          value: series.items[sortCode - 1].exercise
        }
        return new ModelValueChange(modelState);
      }
      const expected = cold('-(cde)', { c: getModelValueChange(1), d: getModelValueChange(2), e: getModelValueChange(3) });
      expect(effects.initModel$).toBeObservable(expected);
    });

    it('should init model after query series success', () => {
      const series = mockSeries[0];
      const action = new SeriesQuerySuccess([series]);

      actions$.stream = hot('-a', { a: action });

      const getModelValueChange = (sortCode: number) => {
        const key0 = new ExerciseKey(series._id, sortCode);
        const modelState: ModelState = {
          id: key0.exercisePath,
          versionId: 1,
          progLang: ProgrammingLanguage.typescript,
          value: series.items[sortCode - 1].exercise
        }
        return new ModelValueChange(modelState);
      }
      const expected = cold('-(cde)', { c: getModelValueChange(1), d: getModelValueChange(2), e: getModelValueChange(3) });
      expect(effects.initModelQuery$).toBeObservable(expected);
    });
  });

});
