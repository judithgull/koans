import { progressInitialState, progressReducer } from './progress.reducer';
import { InitSeriesProgress } from './progress.action';
import { mockSeries } from '../../common/test/index';
import {
  SeriesProgress,
  ModelState,
  ProgrammingLanguage
} from '../../model';
import { ExerciseSolved, ToggleSolutionVisible } from '../index';

describe('Progress Reducer', () => {
  const initialProgressStateSeries1 = {
    entities: {
      '1': {
        '1': {
          id: 1,
          value: mockSeries[0].items[0].exercise,
          solved: false,
          solutionRequested: false,
          solutionVisible: false
        },
        '2': {
          id: 2,
          value: mockSeries[0].items[1].exercise,
          solved: false,
          solutionRequested: false,
          solutionVisible: false
        },
        '3': {
          id: 3,
          value: mockSeries[0].items[2].exercise,
          solved: false,
          solutionRequested: false,
          solutionVisible: false
        }
      }
    }
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action: any = {};
      const state = progressReducer(undefined, action);
      expect(state).toBe(progressInitialState);
    });
  });

  describe('INIT_SERIES_PROGRESS action', () => {
    it('should initialize progress entities', () => {
      const series = mockSeries[0];
      const action = new InitSeriesProgress(series);
      const state = progressReducer(progressInitialState, action);
      expect(state).toEqual(initialProgressStateSeries1);
    });

    it('should overwrite other progress entities', () => {
      const series = mockSeries[0];
      series.items = [series.items[0]];
      const action = new InitSeriesProgress(series);
      const state = progressReducer(progressInitialState, action);
      expect(state.entities['1']['2']).toBeUndefined();
    });
  });

  describe('EXERCISE_SOLVED action', () => {
    it('should update the solved state', () => {
      const series = mockSeries[0];
      const id = series._id;
      const action = new ExerciseSolved({
        seriesId: 1,
        id: 1,
        userSolution: 'solution'
      });

      const state = progressReducer(initialProgressStateSeries1, action);
      expect(state.entities[1][1].solved).toBeTruthy();
      expect(state.entities[1][2].solved).toBeFalsy();
    });
  });

  describe('TOGGLE_SOLUTION_VISIBLE action', () => {
    it('should should toggle solution visible', () => {
      const series = mockSeries[0];
      const id = series._id;
      const action = new ToggleSolutionVisible({
        seriesId: 1,
        id: 1
      });

      const state = progressReducer(initialProgressStateSeries1, action);
      expect(state.entities[1][1].solutionRequested).toBeTruthy();
      expect(state.entities[1][1].solutionVisible).toBeTruthy();
      expect(state.entities[1][2].solutionRequested).toBeFalsy();
    });
  });
});
