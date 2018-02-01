import { ExerciseUserProgress } from '../../../common/model/exercise';
import * as ea from '../actions/exercise.action';

export interface SeriesUserState {
  [id: string]: ExerciseUserProgress;
}

export interface SeriesUserStates {
  entities: { [id: string]: SeriesUserState };
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
          entities: { [id: string]: ExerciseUserProgress },
          ex: ExerciseUserProgress
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
      const newEntity: ExerciseUserProgress = {
        ...previousExState,
        userSolution: exState.userSolution,
        solved: !previousExState.solutionRequested
      };
      const newSeries: SeriesUserState = {
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
      const newEntity: ExerciseUserProgress = {
        ...previousExState,
        solutionRequested: !previousExState.solved,
        solutionVisible: !previousExState.solutionVisible
      };
      const newSeries: SeriesUserState = {
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
