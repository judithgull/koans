import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { getRouterState } from '../router';
import { EditorModelEntities } from '..';
import { SeriesQueries } from '../series';
import { Feedback, ExerciseKey, ISeries, ExerciseProgress } from '../../model';

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

const initialProgress = {
  solutionRequested: false,
  solutionVisible: false,
  valid: false,
  solved: false
};

export const getSelectedProgresses: MemoizedSelector<object, ExerciseProgress[]> = createSelector(
  getEditorModelEntities,
  SeriesQueries.selectedSeries,
  (entities: { [id: string]: Feedback; }, series: ISeries) => {
    if (entities && series) {
      const progresses = getExerciseKeys(series)
        .map(key => {
          return entities[key.exercisePath];
        })
        .map(f => {
          if (!f) {
            return initialProgress;
          } else {
            return {
              solutionRequested: f.solutionRequested,
              solutionVisible: f.solutionVisible,
              valid: f.valid,
              solved: f.valid && !f.solutionRequested
            }
          }
        });
      return progresses;
    }
    return [];
  }
);

function getExerciseKeys(series: ISeries): ExerciseKey[] {
  return series.items.map(item => new ExerciseKey(series._id, item.sortOrder));
}
