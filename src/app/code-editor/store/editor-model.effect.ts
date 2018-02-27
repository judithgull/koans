import { Actions, Effect } from '@ngrx/effects';
import {
  CHANGE_MODEL_VALUE_ACTION,
  MODEL_MONACO_SUCCESS,
  EditorModelAction,
  ValidationResultAction,
  MonacoSuccessAction,
  ExecutorErrorAction,
  ExecutorSuccessAction
} from './editor-model.action';
import { map, tap } from 'rxjs/operators';
import { FeedbackFactory, FeedbackType, ModelState } from '../../common/model';
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
  validate$: Observable<ValidationResultAction> = this.actions$
    .ofType(CHANGE_MODEL_VALUE_ACTION)
    .pipe(
      map((a: EditorModelAction) => a.payload.modelState),
      map((modelState: ModelState) => {
        const errors = this.validationService.validate(modelState.value);

        const newPayload = {
          modelState,
          validation: {
            success: errors.length === 0,
            errors
          }
        };
        return new ValidationResultAction(newPayload);
      })
    );

  @Effect()
  execute$: Observable<
    ExecutorSuccessAction | ExecutorErrorAction
  > = this.actions$.ofType(MODEL_MONACO_SUCCESS).pipe(
    map((a: MonacoSuccessAction) => a.payload.modelState),
    map((modelState: ModelState) => {
      const errors = this.codeExecutorService.run(
        modelState.value,
        modelState.progLang
      );
      if (errors.length) {
        return new ExecutorErrorAction({ modelState, errors });
      } else {
        return new ExecutorSuccessAction({ modelState });
      }
    })
  );
}
