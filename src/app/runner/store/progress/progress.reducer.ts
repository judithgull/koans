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
import {
  toInitialProgress,
  solve,
  toggleSolutionVisible
} from './exercise-progress.util';

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
      const { id, seriesId, userSolution } = action.payload;
      return getUpdatedExerciseProgress(
        seriesId,
        id,
        state,
        solve(userSolution)
      );
    }
    case TOGGLE_SOLUTION_VISIBLE: {
      const { id, seriesId } = action.payload;
      return getUpdatedExerciseProgress(
        seriesId,
        id,
        state,
        toggleSolutionVisible
      );
    }
  }
  return state;
}

function getUpdatedExerciseProgress(
  seriesId: number,
  id: number,
  state: SeriesProgressEntities,
  fn: (p: ExerciseProgress) => ExerciseProgress
): SeriesProgressEntities {
  const previousProgress: SeriesProgress = state.entities[seriesId];
  const previousExProgress: ExerciseProgress = previousProgress[id];
  const newSeriesProgress: SeriesProgress = {
    ...previousProgress,
    [id]: fn(previousExProgress)
  };
  return {
    entities: {
      ...state.entities,
      [seriesId]: newSeriesProgress
    }
  };
}

function getSeriesProgress(series: ISeries): SeriesProgress {
  const progress: ExerciseProgress[] = series.items.map(toInitialProgress);
  return toEntities(progress, e => e.id);
}
