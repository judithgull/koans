import { initialState, reducer } from './series.reducer';
import { QuerySeries, QuerySeriesSuccess, QuerySeriesFail } from '../index';
import { mockSeries } from '../../common/test/series.mock';

describe('Series Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action: any = {};
      const state = reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('QUERY SERIES action', () => {
    it('should set loading true', () => {
      const action = new QuerySeries({});
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.loaded).toBe(false);
      expect(state.entities).toEqual({});
    });
  });

  describe('QUERY SERIES FAIL action', () => {
    it('should set loaded false', () => {
      const action = new QuerySeriesFail('message');
      const state = reducer(
        { loaded: true, loading: true, entities: {} },
        action
      );
      expect(state.loading).toBe(false);
      expect(state.loaded).toBe(false);
      expect(state.entities).toEqual({});
    });
  });

  describe('QUERY SERIES SUCCESS action', () => {
    it('should map empty array to entities', () => {
      const action = new QuerySeriesSuccess([]);
      const state = reducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.loaded).toBe(true);
      expect(state.entities).toEqual({});
    });

    it('should map non-empty array to entities', () => {
      const action = new QuerySeriesSuccess(mockSeries);
      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.loaded).toBe(true);
      expect(state.entities[mockSeries[0]._id]).toEqual(mockSeries[0]);
    });
  });
});
