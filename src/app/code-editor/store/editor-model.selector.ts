import { EditorModelState } from './editor-model.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EditorModelEntities } from '.';
import { FeedbackType, SourceType } from '../../common/model';

export const getEditorModel = createFeatureSelector<EditorModelEntities>(
  'editorModel'
);

export const getEditorModelEntities = createSelector(
  getEditorModel,
  (state: EditorModelEntities) => state && state.entities
);

export function getModelEntity(modelId: string) {
  return createSelector(
    getEditorModelEntities,
    entities => entities && entities[modelId]
  );
}

export function getResult(modelId: string) {
  return createSelector(
    getModelEntity(modelId),
    model => model && model.result
  );
}

export function getValidationResult(modelId: string) {
  return createSelector(getResult(modelId), result => {
    if (result && result.source === SourceType.Validation) {
      return result;
    }
    return null;
  });
}
