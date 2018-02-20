import { Actions, Effect } from '@ngrx/effects';
import {
  CHANGE_MODEL_VALUE_ACTION,
  EditorModelAction,
  ValidationFailedAction,
  ValidationSuccessAction
} from './validate-exercise.action';
import { map } from 'rxjs/operators';
import { FeedbackFactory, FeedbackType } from '../../common/model';
import { CodeEditorValidationSerivce } from '../validation';
import { Injectable } from '@angular/core';

@Injectable()
export class EditorModelEffects {
  constructor(
    private actions$: Actions,
    private validationService: CodeEditorValidationSerivce
  ) {}

  @Effect()
  validate$ = this.actions$.ofType(CHANGE_MODEL_VALUE_ACTION).pipe(
    map((a: EditorModelAction) => a.payload),
    map(a => {
      const result = this.validationService.validate(a.value);
      const newPayload = {
        ...a,
        result
      };
      if (result.type === FeedbackType.Error) {
        return new ValidationFailedAction(newPayload);
      } else {
        return new ValidationSuccessAction(newPayload);
      }
    })
  );
}
