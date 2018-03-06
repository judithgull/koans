import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ErrorMarker, ModelState } from '../../model';
import {
  CodeEditorValidationSerivce,
  CodeExecutorService
} from '../validation';
import {
  CHANGE_MODEL_VALUE_ACTION,
  createResultAction,
  EditorModelAction,
  MODEL_RESULT_SUCCESS,
  ModelResultAction
} from './editor-model.action';

@Injectable()
export class EditorModelEffects {
  constructor(
    private actions$: Actions,
    private validationService: CodeEditorValidationSerivce,
    private codeExecutorService: CodeExecutorService
  ) {}

  @Effect()
  validate$: Observable<ModelResultAction> = this.actions$
    .ofType(CHANGE_MODEL_VALUE_ACTION)
    .pipe(
      map((a: EditorModelAction) => a.modelState),
      map((modelState: ModelState) => {
        const errors = this.validationService.validate(modelState.value);
        return createResultAction('validation', modelState, errors);
      })
    );

  @Effect()
  execute$: Observable<ModelResultAction> = this.actions$
    .ofType(MODEL_RESULT_SUCCESS)
    .pipe(
      filter((a: ModelResultAction) => a.key === 'validation'),
      map((a: ModelResultAction) => a.modelState),
      map((modelState: ModelState) =>
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
