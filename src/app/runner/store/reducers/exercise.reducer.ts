import { ExerciseUserProgress } from '../../../common/model/exercise';
import * as ea from '../actions/exercise.action';

export interface ExerciseUserState {
  entities: { [id: string]: ExerciseUserProgress };
  loaded: boolean;
  loading: boolean;
}

export const initialState: ExerciseUserState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: ea.ExersiseUserStateAction
): ExerciseUserState {
  switch (action.type) {
    case ea.LOAD_EXERCISE_USER_STATE: {
      return {
        ...state,
        entities: {},
        loading: true
      };
    }
    case ea.LOAD_EXERCISE_USER_STATE_SUCCESS: {
      const exStates = action.payload;

      const entities = exStates.reduce(
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
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case ea.LOAD_EXERCISE_USER_STATE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case ea.EXERCISE_SOLVED: {
      const exState = action.payload;
      return {
        entities: {
          ...state.entities,
          [exState.id]: exState
        },
        loaded: state.loaded,
        loading: state.loading
      };
    }
  }
  return state;
}

export const getUserStateLoading = (state: ExerciseUserState) => state.loading;
export const getUserStateLoaded = (state: ExerciseUserState) => state.loaded;
export const getUserStateEntities = (state: ExerciseUserState) =>
  state.entities;
