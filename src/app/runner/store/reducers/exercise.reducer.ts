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
  }
  return state;
}
