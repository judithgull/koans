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
import { FeedbackFactory, FeedbackType } from '../../common/model';
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
      map((a: EditorModelAction) => a.payload),
      map(a => {
        const errors = this.validationService.validate(a.value);

        const newPayload = {
          ...a,
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
    map((a: MonacoSuccessAction) => a.payload),
    map(p => {
      const errors = this.codeExecutorService.run(p.value, p.prodLang);
      if (errors.length) {
        return new ExecutorErrorAction({ ...p, errors });
      } else {
        return new ExecutorSuccessAction({ ...p });
      }
    })
  );
}
