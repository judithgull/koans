import {
  SeriesProgress,
  ExerciseProgress,
  ISeries
} from '../../../common/model';
import {
  SeriesProgressAction,
  INIT_SERIES_PROGRESS,
  EXERCISE_SOLVED,
  TOGGLE_SOLUTION_VISIBLE
} from './progress.action';
import { toEntities } from '../../../store/entityUtil';
import { toInitialProgress } from './progress.util';

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
      const series: ISeries = action.payload;
      return {
        entities: {
          ...state.entities,
          [series._id]: getSeriesProgress(series)
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

function getSeriesProgress(series: ISeries): SeriesProgress {
  const progress: ExerciseProgress[] = series.items.map(toInitialProgress);
  return toEntities(progress, e => e.id);
}
