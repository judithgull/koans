import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EditorModelEntities } from '..';

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

export function getValidationResult(modelId: string) {
  return createSelector(getModelEntity(modelId), model => {
    if (model && model.validation) {
      return model;
    }
    return null;
  });
}
