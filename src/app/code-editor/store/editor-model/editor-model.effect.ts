import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ErrorMarker, ModelState, SourceType, Feedback } from '../../../model';
import {
  CodeEditorValidationSerivce,
  CodeExecutorService
} from '../../validation';
import {
  CHANGE_MODEL_VALUE_ACTION,
  createResultAction,
  EditorModelAction,
  MODEL_RESULT_SUCCESS,
  ModelResultAction,
  ResultSuccessAction,
  AllSuccessAction
} from './editor-model.action';
import { getModelEntity } from './editor-model.selector';
import { Store } from '@ngrx/store';
import { EditorModelState } from './editor-model-state';
import { CodeEditorState } from '..';
import { getLib } from '../js-libs/js-libs.selector';

@Injectable()
export class EditorModelEffects {
  constructor(
    private actions$: Actions,
    private validationService: CodeEditorValidationSerivce,
    private codeExecutorService: CodeExecutorService,
    private store: Store<EditorModelState>,
    private ceStore: Store<CodeEditorState>
  ) {}

  @Effect()
  validate$: Observable<ModelResultAction> = this.actions$
    .ofType(CHANGE_MODEL_VALUE_ACTION)
    .pipe(
      map((a: EditorModelAction) => a.modelState),
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
    .ofType(MODEL_RESULT_SUCCESS)
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

  @Effect()
  validateAll$: Observable<AllSuccessAction> = this.actions$
    .ofType(MODEL_RESULT_SUCCESS)
    .pipe(
      switchMap(({ key, modelState }: ResultSuccessAction) => {
        return this.store
          .select(getModelEntity(modelState.id))
          .pipe(
            filter(entity => !!entity),
            filter(entity => this.isAllSuccess(entity, key)),
            map(entity => new AllSuccessAction(modelState))
          );
      })
    );

  isAllSuccess(f: Feedback, key: string): boolean {
    const merged = {
      ...f,
      [key]: {
        success: true,
        errors: []
      }
    };
    return (
      merged.monaco &&
      merged.monaco.success &&
      merged.validation &&
      merged.validation.success &&
      merged.execution &&
      merged.execution.success
    );
  }
}
