import { initialState, progressReducer } from './progress.reducer';
import { InitSeriesProgress } from './progress.action';
import { mockSeries } from '../../../common/test/index';
import { SeriesProgress } from '../../../common/model/index';
import { LoadSeriesProgressSuccess } from './index';
import { toInitialProgress } from './progress.util';

describe('Progress Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action: any = {};
      const state = progressReducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('INIT_SERIES_PROGRESS action', () => {
    it('initialize it with empty entities', () => {
      const series = mockSeries[0];
      const id = series._id;
      const action = new InitSeriesProgress(series);
      const state = progressReducer(initialState, action);
      expect(state.entities).toEqual({});
    });
  });

  describe('LoadSeriesProgressSuccess action', () => {
    it('initialize it with empty user progress array', () => {
      const series = mockSeries[0];
      const id = series._id;
      const action = new LoadSeriesProgressSuccess({
        seriesId: id,
        userProgress: []
      });
      const state = progressReducer(initialState, action);
      const emptyEntities = {};
      expect(state.entities.id).toBeUndefined();
    });

    it('initialize it with non-empty user progress array', () => {
      const series = mockSeries[0];
      const id = series._id;
      const initialProgress = series.items.map(toInitialProgress);
      const exId1 = initialProgress[0].id;
      const action = new LoadSeriesProgressSuccess({
        seriesId: id,
        userProgress: initialProgress
      });
      const state = progressReducer(initialState, action);
      const emptyEntities = {};
      expect(state.entities[id][exId1]).toEqual(initialProgress[0]);
    });
  });
});
