import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { TestBed } from '@angular/core/testing';

import { mockSeries } from '../../common/test/index';
import {
  QuerySeries,
  QuerySeriesSuccess,
  CreateSeries,
  CreateSeriesSuccess
} from '../index';
import { SeriesService } from '../../common/series.service';
import { SeriesEffects } from './series.effect';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { hot, cold } from 'jasmine-marbles';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

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
    spyOn(service, 'delete').and.returnValue(of(mockSeries[0]));
  });

  describe('querySeries$', () => {
    it('should return a collection from LoadSeriesSuccess', () => {
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
});
