import { Feedback, FeedbackDetails, SourceType, ModelState } from '../../model';
import {
  MODEL_VALUE_CHANGE,
  ModelAction,
  MODEL_ERROR,
  MODEL_SUCCESS,
  MODEL_SOLUTION_VISIBLE_TOGGLE,
} from './editor-model.action';

export interface EditorModelEntities {
  entities: {
    [id: string]: Feedback;
  };
}

export const emInitialState: EditorModelEntities = {
  entities: {}
};

export function editorModelReducer(
  state = emInitialState,
  action: ModelAction
): EditorModelEntities {
  switch (action.type) {
    case MODEL_SOLUTION_VISIBLE_TOGGLE: {
      const id = action.key.exercisePath;
      // ignore, if the value does not exist yet
      if (!state.entities[id]) {
        return state;
      }
      const currentlyVisible = state.entities[id].solutionVisible;

      return {
        ...state,
        entities: {
          ...state.entities,
          [action.key.exercisePath]: {
            ...state.entities[id],
            solutionRequested: true,
            solutionVisible: !currentlyVisible
          }
        }
      };
    }
    case MODEL_VALUE_CHANGE:
      if (isOldVersion(state, action.modelState)) {
        return state;
      }
      const currentModel = state.entities[action.modelState.id];
      const solutionVisible = currentModel ? currentModel.solutionVisible : false;
      const solutionRequested = currentModel ? currentModel.solutionRequested : false;

      return {
        ...state,
        entities: {
          ...state.entities,
          [action.modelState.id]: {
            ...action.modelState,
            valid: false,
            solutionRequested,
            solutionVisible
          }
        }
      };
    case MODEL_ERROR: {
      const currentModelState = state.entities[action.modelState.id];
      if (!currentModelState || isOldVersion(state, action.modelState)) {
        return state;
      }
      const result = {
        success: false,
        errors: action.errors
      };
      return addResult(
        action.key,
        result,
        state.entities[action.modelState.id],
        action.modelState,
        state
      );
    }
    case MODEL_SUCCESS: {
      const currentModelState = state.entities[action.modelState.id];
      if (!currentModelState || isOldVersion(state, action.modelState)) {
        return state;
      }
      const result = {
        success: true,
        errors: []
      };
      return addResult(
        action.key,
        result,
        currentModelState,
        action.modelState,
        state
      );
    }
  }
  return state;
}

function isOldVersion(existingState: EditorModelEntities, newState: ModelState): boolean {
  const existingModelState = newState
    ? existingState.entities[newState.id]
    : undefined;
  return existingModelState && existingModelState.versionId > newState.versionId;
}

function isValid(resultKey: string, result: FeedbackDetails, existingModelState: Feedback): boolean {
  const existingValidationValid = existingModelState.validation && existingModelState.validation.success;
  const existingExecutionValid = existingModelState.execution && existingModelState.execution.success;
  const existingMonacoValid = !existingModelState.monaco || existingModelState.monaco.success;

  if (!result.success) {
    return false;
  } else if (resultKey === SourceType.execution && existingValidationValid && existingMonacoValid) {
    return true;
  } else if (resultKey === SourceType.monaco && existingValidationValid && existingExecutionValid) {
    return true;
  } else if (resultKey === SourceType.validation && existingExecutionValid && existingMonacoValid) {
    return true;
  }
  return false;
}

function addResult(
  resultKey: string,
  result: FeedbackDetails,
  existingModelState: Feedback,
  newModelState: ModelState,
  state: EditorModelEntities
): EditorModelEntities {
  const isEqualVersion =
    existingModelState.versionId === newModelState.versionId;

  if (isEqualVersion) {
    return {
      ...state,
      entities: {
        ...state.entities,
        [newModelState.id]: {
          ...existingModelState,
          [resultKey]: result,
          valid: isValid(resultKey, result, existingModelState)
        }
      }
    };
  } else {
    return {
      ...state,
      entities: {
        ...state.entities,
        [newModelState.id]: {
          value: newModelState.value,
          progLang: newModelState.progLang,
          id: newModelState.id,
          versionId: newModelState.versionId,
          [resultKey]: result,
          valid: existingModelState.valid,
          solutionRequested: existingModelState.solutionRequested,
          solutionVisible: existingModelState.solutionVisible
        }
      }
    };
  }
}
