import { ExerciseProgress, ISeries, SeriesProgress } from '../../../model';
import { toEntities } from '../../../store/entityUtil';
import {
  addModelState,
  solve,
  toggleSolutionVisible,
  toInitialProgress
} from './exercise-progress.util';
import {
  EXERCISE_SOLVED,
  INIT_SERIES_PROGRESS,
  REGISTER_MODEL,
  SeriesProgressAction,
  TOGGLE_SOLUTION_VISIBLE
} from './progress.action';

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
    case REGISTER_MODEL: {
      const { id, seriesId, modelState } = action.payload;
      return getUpdatedExerciseProgress(
        seriesId,
        id,
        state,
        addModelState(modelState)
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
