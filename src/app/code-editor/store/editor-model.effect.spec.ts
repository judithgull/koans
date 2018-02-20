import { TestBed } from '@angular/core/testing';
import { EditorModelEffects } from './editor-model.effect';
import {
  ChangeModelValueAction,
  ValidationFailedAction
} from './editor-model.action';
import { hot, cold } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { getActions, TestActions } from '../../store/test';
import { FeedbackFactory, SourceType } from '../../common/model';
import { CodeEditorValidationSerivce } from '../validation';
import { EditableMarkerService } from '../../common/editable-marker.service';

describe('EditorModelEffects', () => {
  let actions$: TestActions;
  let effects: EditorModelEffects;
  let validationService: CodeEditorValidationSerivce;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CodeEditorValidationSerivce,
        EditableMarkerService,
        EditorModelEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });
    validationService = TestBed.get(CodeEditorValidationSerivce);
    actions$ = TestBed.get(Actions);
    effects = TestBed.get(EditorModelEffects);
  });

  describe('validate$', () => {
    it('should fail validation for empty value', () => {
      const action = new ChangeModelValueAction({
        id: '0',
        versionId: 0,
        value: ''
      });

      actions$.stream = hot('-a', { a: action });

      const expected = cold('-b', {
        b: new ValidationFailedAction({
          id: '0',
          versionId: 0,
          value: '',
          result: FeedbackFactory.createError(
            SourceType.Validation,
            validationService.emptyErrorMessage,
            ''
          )
        })
      });
      expect(effects.validate$).toBeObservable(expected);
    });
  });
});
