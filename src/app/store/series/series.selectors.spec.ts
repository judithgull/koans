import {
  State,
  reducers,
  getSeriesEntities,
  QuerySeriesSuccess,
  getRouterState,
  getSelectedExercise,
  getAllSeries
} from '../index';
import { Store, StoreModule } from '@ngrx/store';
import { mockSeries } from '../../common/test';
import { TestBed } from '@angular/core/testing';
import { getSelectedSeries, getOwnSeries } from './series.selectors';

describe('Series Selectors', () => {
  let store: Store<State>;
  const seriesEntities = {
    [mockSeries[0]._id]: mockSeries[0],
    [mockSeries[1]._id]: mockSeries[1]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...reducers
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getSeriesEntities', () => {
    it('should initially return empty entities', () => {
      store.select(getSeriesEntities).subscribe(value => {
        expect(value).toEqual({});
      });
    });

    it('should return the series as entities', () => {
      let result;
      store.select(getSeriesEntities).subscribe(value => {
        result = value;
      });
      store.dispatch(new QuerySeriesSuccess(mockSeries));
      expect(result).toEqual(seriesEntities);
    });
  });

  describe('getSelectedSeries', () => {
    it('should initially return empty entities', () => {
      store.select(getSelectedSeries).subscribe(value => {
        expect(value).toBeFalsy();
      });
    });

    it('should return the selected series', () => {
      let result;

      store.select(getSelectedSeries).subscribe(value => {
        result = value;
      });

      store.dispatch(new QuerySeriesSuccess(mockSeries));

      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/series/2/e/1',
            queryParams: {},
            params: { id: '2' }
          },
          event: {}
        }
      });

      expect(result).toEqual(seriesEntities[2]);
    });
  });

  describe('getSelectedExercise', () => {
    it('should initially return null', () => {
      store.select(getSelectedExercise).subscribe(value => {
        expect(value).toBeFalsy();
      });
    });

    it('should return the selected exercise', () => {
      let result;

      store.select(getSelectedExercise).subscribe(value => {
        result = value;
      });

      store.dispatch(new QuerySeriesSuccess(mockSeries));

      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/series/2/e/1',
            queryParams: {},
            params: { id: '2', exId: '1' }
          },
          event: {}
        }
      });

      expect(result).toEqual(seriesEntities[2].items[0]);
    });
  });

  describe('getAllSeries', () => {
    it('should initially be empty', () => {
      store.select(getAllSeries).subscribe(value => {
        expect(value).toEqual([]);
      });
    });

    it('should return the series array', () => {
      let result;

      store.select(getAllSeries).subscribe(value => {
        result = value;
      });

      store.dispatch(new QuerySeriesSuccess(mockSeries));

      expect(result).toEqual(mockSeries);
    });
  });

  describe('getOwnSeries', () => {
    it('should initially be empty', () => {
      store.select(getOwnSeries('')).subscribe(value => {
        expect(value).toEqual([]);
      });
    });

    it('should return empty, if there are no own series', () => {
      let result;

      store.select(getOwnSeries('')).subscribe(value => {
        result = value;
      });

      store.dispatch(new QuerySeriesSuccess(mockSeries));

      expect(result).toEqual([]);
    });

    it('should return the own series', () => {
      let result;

      store
        .select(getOwnSeries('566d8953bb7b381c00f3a930'))
        .subscribe(value => {
          result = value;
        });

      store.dispatch(new QuerySeriesSuccess(mockSeries));

      expect(result).toEqual(mockSeries);
    });
  });
});
