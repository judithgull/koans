import { Feedback, FeedbackDetails, SourceType, ModelState, ExerciseKey, ExerciseProgress, ISeries } from '../../model';
import {
  ModelAction,
  EditorModelActionTypes,
} from './editor-model.action';
import { createSelector, Selector } from '@ngrx/store';
import { SeriesQueries } from '../series';
import { AppState } from '../app.state';
import { EditorModelState } from './editor-model-state';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export const EM_INITIAL_STATE: EditorModelState = {
  ids: [],
  entities: {}
};

const adapter: EntityAdapter<Feedback> = createEntityAdapter<Feedback>();

export function editorModelReducer(
  state = EM_INITIAL_STATE,
  action: ModelAction
): EditorModelState {
  switch (action.type) {
    case EditorModelActionTypes.INIT: {
      const feedbacks: Feedback[] = action.modelStates.map(m => ({
        ...m,
        valid: false,
        solutionRequested: false,
        solutionVisible: false
      }));

      return adapter.upsertMany(feedbacks, state);
    }
    case EditorModelActionTypes.VALUE_CHANGE:
      if (isOldVersion(state, action.modelState)) {
        return state;
      }
      return adapter.updateOne({ id: action.modelState.id, changes: action.modelState }, state);
    case EditorModelActionTypes.TOGGLE_SOLUTION: {
      const id = action.key.exercisePath;
      if (!state.entities[id]) {
        return state;
      }

      const currentlyVisible = state.entities[id].solutionVisible;

      return adapter.updateOne({
        id,
        changes: {
          solutionRequested: true,
          solutionVisible: !currentlyVisible
        }
      }, state);
    }
    case EditorModelActionTypes.ERROR: {
      const currentModelState = state.entities[action.modelState.id];
      if (!currentModelState || isOldVersion(state, action.modelState)) {
        return state;
      }
      const result = {
        success: false,
        errors: action.errors
      };

      return adapter.updateOne({
        id: action.modelState.id,
        changes: {
          [action.key]: result,
          valid: isValid(action.key, result, currentModelState)
        }
      }, state);
    }
    case EditorModelActionTypes.SUCCESS: {
      const currentModelState = state.entities[action.modelState.id];
      if (!currentModelState || isOldVersion(state, action.modelState)) {
        return state;
      }
      const result = {
        success: true,
        errors: []
      };
      return adapter.updateOne({
        id: action.modelState.id,
        changes: {
          [action.key]: result,
          valid: isValid(action.key, result, currentModelState)
        }
      }, state);;
    }
  }
  return state;
}

function isOldVersion(existingState: EditorModelState, newState: ModelState): boolean {
  const existingModelState = existingState.entities[newState.id];
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

export namespace EditorModelQueries {

  export const entities = (state: AppState) => state.editorModel.entities;

  export function getModelEntity(modelId: string) {
    return createSelector(
      entities,
      entities => entities && entities[modelId]
    );
  }

  export function getFeedbackDetails(modelId: string, sourceType: SourceType, version: number) {
    return createSelector(
      getModelEntity(modelId),
      model => {
        if (model && model.versionId === version) {
          return model[sourceType];
        }
        return undefined;
      }
    );
  }

  export function getValidationResult(modelId: string, version: number) {
    return getFeedbackDetails(modelId, SourceType.validation, version);
  }

  export const getSelectedProgress: Selector<AppState, Feedback> = createSelector(
    entities,
    SeriesQueries.selectedSeriesId,
    SeriesQueries.selectedExerciseNr,
    (entities: { [id: string]: Feedback; }, seriesId: string, exerciseNr: number) => {
      if (entities && seriesId && exerciseNr) {
        const key = new ExerciseKey(seriesId, exerciseNr);
       // console.log(entities[key.exercisePath]);
        return entities[key.exercisePath];
      }
      return null;
    }
  );

  export const initialProgress = {
    solutionRequested: false,
    solutionVisible: false,
    valid: false,
    solved: false
  };

  export const getSelectedProgresses: Selector<AppState, ExerciseProgress[]> = createSelector(
    entities,
    SeriesQueries.selectedSeries,
    (entities: { [id: string]: Feedback; }, series: ISeries) => {
      if (entities && series) {
        const keys: string[] = getExerciseKeys(series);
        const values: Feedback[] = keys.map(key => entities[key]);
        const v2 = values.map((v: Feedback) => {
          if (v) {
            return {
              solutionRequested: v.solutionRequested,
              solutionVisible: v.solutionVisible,
              valid: v.valid,
              solved: v.valid && !v.solutionRequested,
            };
          }
          return undefined;
        }
        );
        return v2;
      }
      return [];
    }
  );

  function getExerciseKeys(series: ISeries): string[] {
    return series.items.map(item => new ExerciseKey(''+series._id, item.sortOrder).exercisePath);
  }
}
