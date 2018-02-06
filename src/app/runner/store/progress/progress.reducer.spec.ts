import { initialState, progressReducer } from './progress.reducer';
import { InitSeriesProgress } from './progress.action';
import { mockSeries } from '../../../common/test/index';
import { SeriesProgress } from '../../../common/model';
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
      const initialProgress = series.items.map(toInitialProgress);
      const exId1 = initialProgress[0].id;
      const state = progressReducer(initialState, action);
      expect(state.entities[id][exId1]).toEqual(initialProgress[0]);
    });
  });
});
