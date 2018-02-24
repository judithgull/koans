import { EditorModelState } from './editor-model.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EditorModelEntities } from '.';

export const getEditorModel = createFeatureSelector<EditorModelEntities>(
  'editorModel'
);

export const getEditorModelEntities = createSelector(
  getEditorModel,
  (state: EditorModelEntities) => state.entities
);

// TODO select validation error
export function getValidationError(modelId: string) {
  return createSelector(
    getEditorModelEntities,
    entities => entities[modelId] && entities[modelId].result
  );
}
