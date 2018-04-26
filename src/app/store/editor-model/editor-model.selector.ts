import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { getRouterState } from '../router';
import { EditorModelEntities } from '..';
import { Feedback, ExerciseKey } from '../../model';

export const getEditorModel = createFeatureSelector<EditorModelEntities>(
  'editorModel'
);

export const getEditorModelEntities: MemoizedSelector<object, { [id: string]: Feedback; }>
  = createSelector(
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

export const getSelectedProgress: MemoizedSelector<object, Feedback> = createSelector(
  getEditorModelEntities,
  getRouterState,
  (entities: { [id: string]: Feedback; }, router) => {
    if (entities && router && router.state) {
      const params = router.state.params;
      const key = new ExerciseKey(params.id, params.exId);
      return entities[key.exercisePath];
    }
    return null;
  }
);

/*
export const getSelectedProgresses: MemoizedSelector<object, Feedback[]> = createSelector(
  getEditorModelEntities,
  getRouterState,
  (entities: { [id: string]: Feedback; }, router) => {
    if (entities && router && router.state) {
      const seriesId = router.state.params.id;
      const path = seriesId + '/' + exId + '/exercise';
      return entities[path];
    }
    return null;
  }
);
*/
