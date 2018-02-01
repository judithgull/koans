import * as ea from '../actions/exercise.action';
import { SeriesProgress, ExerciseProgress } from '../../../common/model';

export interface SeriesUserStates {
  entities: { [id: string]: SeriesProgress };
}

export const initialState: SeriesUserStates = {
  entities: {}
};

export function reducer(
  state = initialState,
  action: ea.ExersiseUserStateAction
): SeriesUserStates {
  switch (action.type) {
    case ea.LOAD_EXERCISE_USER_STATE: {
      return {
        ...state,
        entities: {}
      };
    }
    case ea.LOAD_EXERCISE_USER_STATE_SUCCESS: {
      const exProgress = action.payload.userProgress;
      const id = action.payload.seriesId;

      const exEntities = exProgress.reduce(
        (
          entities: { [id: string]: ExerciseProgress },
          ex: ExerciseProgress
        ) => {
          return {
            ...entities,
            [ex.id]: ex
          };
        },
        {
          ...state.entities[id]
        }
      );

      return {
        entities: {
          ...state.entities,
          [id]: exEntities
        }
      };
    }

    case ea.LOAD_EXERCISE_USER_STATE_FAIL: {
      return {
        ...state
      };
    }
    case ea.EXERCISE_SOLVED: {
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
    case ea.TOGGLE_SOLUTION_VISIBLE: {
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

export const getUserStateEntities = (state: SeriesUserStates) => state.entities;
