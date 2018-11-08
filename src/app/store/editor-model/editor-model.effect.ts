import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map} from 'rxjs/operators';

import { AppState } from '..';
import { CodeEditorValidationSerivce, CodeExecutorService } from '../../code-editor';
import { ErrorMarker, ModelState, SourceType } from '../../model';
import { EditorModelState } from './editor-model-state';
import {
  MODEL_VALUE_CHANGE,
  createResultAction,
  MODEL_SUCCESS,
  ModelResultAction,
} from './editor-model.action';

@Injectable()
export class EditorModelEffects {
  constructor(
    private actions$: Actions,
    private validationService: CodeEditorValidationSerivce,
    private codeExecutorService: CodeExecutorService
  ) { }

  @Effect()
  validate$: Observable<ModelResultAction> = this.actions$
    .ofType(MODEL_VALUE_CHANGE)
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
    .ofType(MODEL_SUCCESS)
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
