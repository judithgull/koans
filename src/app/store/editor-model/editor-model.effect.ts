import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as R from 'ramda';

import {
  CodeEditorValidationSerivce,
  CodeExecutorService
} from '../../code-editor';
import {
  ErrorMarker,
  ModelState,
  SourceType,
  ExerciseKey,
  ISeries,
  Exercise,
  Feedback
} from '../../model';
import {
  EditorModelActionTypes,
  createResultAction,
  ModelResultAction,
  ModelInitAction,
  ModelValueChange,
  ModelValidateAction
} from './editor-model.action';
import { SeriesActionTypes, SeriesLoadSuccess } from '../series';
import { SeriesQuerySuccess } from '../series/series.action';
import { SeriesFacade } from '../series/series.facade';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class EditorModelEffects {
  constructor(
    private actions$: Actions,
    private validationService: CodeEditorValidationSerivce,
    private codeExecutorService: CodeExecutorService,
    public seriesFacade: SeriesFacade
  ) {}

  getExerciseUUIDs = (series: ISeries) =>
    R.chain(
      exercise => [
        {
          id: new ExerciseKey(series.id, exercise.sortOrder).exercisePath,
          progLang: series.programmingLanguage,
          value: exercise.exercise,
          versionId: 1
        },
        {
          id: new ExerciseKey(series.id, exercise.sortOrder).solutionPath,
          progLang: series.programmingLanguage,
          value: exercise.solution,
          versionId: 1
        }
      ],
      series.items
    );

  @Effect()
  initModel$ = this.actions$.pipe(
    ofType(SeriesActionTypes.LOAD_SUCCESS),
    map((action: SeriesLoadSuccess) => action.series),
    map(this.getExerciseUUIDs),
    map((modelValues: ModelState[]) => new ModelInitAction(modelValues))
  );

  @Effect()
  initModelQuery$ = this.actions$.pipe(
    ofType(SeriesActionTypes.QUERY_SUCCESS),
    map((action: SeriesQuerySuccess) => action.series),
    map((s: ISeries[]) => R.chain(this.getExerciseUUIDs, s)),
    map(modelValues => new ModelInitAction(modelValues))
  );

  @Effect()
  triggerValidateOnValueChange$: Observable<
    ModelValidateAction
  > = this.actions$.pipe(
    ofType(EditorModelActionTypes.VALUE_CHANGE),
    map((a: ModelValueChange) => new ModelValidateAction(a.modelState))
  );

  @Effect()
  validate$: Observable<ModelResultAction> = this.actions$.pipe(
    ofType(EditorModelActionTypes.VALIDATE),
    map((a: ModelValidateAction) => {
      const errors = this.validationService.validate(a.modelState.value);
      return createResultAction(
        SourceType.validation.toString(),
        a.modelState,
        errors
      );
    })
  );

  @Effect()
  execute$: Observable<ModelResultAction> = this.actions$.pipe(
    ofType(EditorModelActionTypes.SUCCESS),
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
