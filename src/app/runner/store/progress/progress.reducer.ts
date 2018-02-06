import { SeriesProgress, ExerciseProgress } from '../../../common/model';
import {
  SeriesProgressAction,
  INIT_SERIES_PROGRESS,
  LOAD_EXERCISE_USER_STATE_SUCCESS,
  EXERCISE_SOLVED,
  TOGGLE_SOLUTION_VISIBLE
} from './progress.action';
import { toEntities } from '../../../store/entityUtil';

export interface SeriesProgressEntities {
  entities: { [id: string]: SeriesProgress };
}

export const initialState: SeriesProgressEntities = {
  entities: {}
};

export function progressReducer(
  state = initialState,
  action: SeriesProgressAction
): SeriesProgressEntities {
  switch (action.type) {
    case INIT_SERIES_PROGRESS: {
      return {
        ...state,
        entities: {}
      };
    }
    case LOAD_EXERCISE_USER_STATE_SUCCESS: {
      const exProgress = action.payload.userProgress;
      const id = action.payload.seriesId;

      const exEntities = toEntities(exProgress, e => e.id, state.entities[id]);

      return {
        entities: {
          ...state.entities,
          [id]: exEntities
        }
      };
    }
    case EXERCISE_SOLVED: {
      const exState = action.payload;
      const seriesId = exState.seriesId;
      const previousSeries = state.entities[seriesId];
      const previousExState = previousSeries[exState.id];
      const newEntity: ExerciseProgress = {
        ...previousExState,
        userSolution: exState.userSolution,
        solved: !previousExState.solutionRequested
      };
      const newSeries: SeriesProgress = {
        ...previousSeries,
        [exState.id]: newEntity
      };
      return {
        ...state,
        entities: {
          ...state.entities,
          [seriesId]: newSeries
        }
      };
    }
    case TOGGLE_SOLUTION_VISIBLE: {
      // TODO refactor
      const exState = action.payload;
      const seriesId = exState.seriesId;
      const previousSeries = state.entities[seriesId];
      const previousExState = previousSeries[exState.id];
      const newEntity: ExerciseProgress = {
        ...previousExState,
        solutionRequested: !previousExState.solved,
        solutionVisible: !previousExState.solutionVisible
      };
      const newSeries: SeriesProgress = {
        ...previousSeries,
        [exState.id]: newEntity
      };
      return {
        ...state,
        entities: {
          ...state.entities,
          [seriesId]: newSeries
        }
      };
    }
  }
  return state;
}
