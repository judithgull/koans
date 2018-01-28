import {
  initialState,
  reducer,
  getSeriesEntities,
  getSeriesLoaded,
  getSeriesLoading
} from './series.reducer';
import {
  QuerySeries,
  QuerySeriesSuccess,
  QuerySeriesFail,
  CreateSeriesSuccess,
  UpdateSeriesSuccess,
  DeleteSeriesSuccess
} from '../index';
import { mockSeries } from '../../common/test/series.mock';

describe('Series Reducer', () => {
  const entities = {
    [mockSeries[0]._id]: mockSeries[0],
    [mockSeries[1]._id]: mockSeries[1]
  };

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
      expect(state.entities).toEqual(entities);
    });
  });

  describe('CREATE SERIES SUCCESS action', () => {
    it('should add new entity to entities', () => {
      const action = new CreateSeriesSuccess(mockSeries[0]);
      const state = reducer(initialState, action);

      expect(state.entities).toEqual({ [mockSeries[0]._id]: mockSeries[0] });
    });
  });

  describe('UPDATE SERIES SUCCESS action', () => {
    it('should update exisiting entity', () => {
      const action = new UpdateSeriesSuccess(mockSeries[0]);
      const state = reducer(
        {
          ...initialState,
          entities: {
            [mockSeries[0]._id]: mockSeries[1]
          }
        },
        action
      );

      expect(state.entities).toEqual({ [mockSeries[0]._id]: mockSeries[0] });
    });
  });

  describe('DELETE SERIES SUCCESS action', () => {
    it('should delete exisiting entity', () => {
      const action = new DeleteSeriesSuccess(mockSeries[0]._id + '');
      const state = reducer(
        {
          ...initialState,
          entities: {
            [mockSeries[0]._id]: mockSeries[0]
          }
        },
        action
      );

      expect(state.entities).toEqual({});
    });
  });

  describe('Selectors', () => {
    it('should select series entites', () => {
      const state = { ...initialState, entities };
      const selectedEntities = getSeriesEntities(state);
      expect(entities).toBe(entities);
    });

    it('should select series loaded', () => {
      const state = { loaded: true, loading: false, entities };
      const loaded = getSeriesLoaded(state);
      expect(loaded).toBe(true);
    });

    it('should select series loading', () => {
      const state = { loaded: true, loading: false, entities };
      const loading = getSeriesLoading(state);
      expect(loading).toBe(false);
    });
  });
});
