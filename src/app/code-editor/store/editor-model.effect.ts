import { Actions, Effect } from '@ngrx/effects';
import {
  CHANGE_MODEL_VALUE_ACTION,
  MODEL_RESULT_SUCCESS,
  ResultSuccessAction,
  ResultErrorAction,
  ModelResultAction,
  EditorModelAction,
  createResultAction
} from './editor-model.action';
import { map, tap, filter } from 'rxjs/operators';
import { FeedbackType, ModelState, ErrorMarker } from '../../common/model';
import {
  CodeEditorValidationSerivce,
  CodeExecutorService
} from '../validation';
import { Injectable } from '@angular/core';
import { Observable } from 'Rx';

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
