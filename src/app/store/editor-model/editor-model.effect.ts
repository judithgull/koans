import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as R from 'ramda';

import { CodeEditorValidationSerivce, CodeExecutorService } from '../../code-editor';
import { ErrorMarker, ModelState, SourceType, ExerciseKey, ISeries } from '../../model';
import {
  EditorModelActionTypes,
  createResultAction,
  ModelResultAction,
  ModelInitAction,
} from './editor-model.action';
import { SeriesActionTypes, SeriesLoadSuccess } from '../series';
import { SeriesQuerySuccess } from '../series/series.action';

@Injectable()
export class EditorModelEffects {
  constructor(
    private actions$: Actions,
    private validationService: CodeEditorValidationSerivce,
    private codeExecutorService: CodeExecutorService
  ) { }

  getExerciseUUIDs = (series: ISeries) => R.chain(
    exercise => [
      {
        id: new ExerciseKey(series._id, exercise.sortOrder).exercisePath,
        progLang: series.programmingLanguage,
        value: exercise.exercise,
        versionId: 1
      },
      {
        id: new ExerciseKey(series._id, exercise.sortOrder).solutionPath,
        progLang: series.programmingLanguage,
        value: exercise.solution,
        versionId: 1
      }
    ],series.items
  );

  @Effect()
  initModel$ = this.actions$
    .ofType(SeriesActionTypes.LOAD_SUCCESS)
    .pipe(
      map((action: SeriesLoadSuccess) => action.series),
      map(this.getExerciseUUIDs),
      map((modelValues: ModelState[]) => new ModelInitAction(modelValues))
    );

  @Effect()
  initModelQuery$ = this.actions$
    .ofType(SeriesActionTypes.QUERY_SUCCESS)
    .pipe(
      map((action: SeriesQuerySuccess) => action.series),
      map((s: ISeries[]) => R.chain(this.getExerciseUUIDs, s)),
      map(modelValues => new ModelInitAction(modelValues))
    );

  @Effect()
  validate$: Observable<ModelResultAction> = this.actions$
    .ofType(EditorModelActionTypes.VALUE_CHANGE)
    .pipe(
      map((a: ModelResultAction) => a.modelState),
      map((modelState: ModelState) => {
        const errors = this.validationService.validate(modelState.value);
        return createResultAction(
          SourceType.validation.toString(),
          modelState,
          errors
        );
      })
    );

  @Effect()
  execute$: Observable<ModelResultAction> = this.actions$
    .ofType(EditorModelActionTypes.SUCCESS)
    .pipe(
      filter(
        (a: ModelResultAction) => a.key === SourceType.validation.toString()
      ),
      map((a: ModelResultAction) => a.modelState),
      map(modelState =>
        createResultAction(
          'execution',
          modelState,
          this.getExecutionErrors(modelState)
        )
      )
    );

  getExecutionErrors(modelState: ModelState): ErrorMarker[] {
    return this.codeExecutorService.run(modelState.value, modelState.progLang);
  }

}
