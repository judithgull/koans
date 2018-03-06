import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';

import { EditableMarkerService } from '../../common/editable-marker.service';
import { ProgrammingLanguage } from '../../model';
import { getActions, TestActions } from '../../store/test';
import {
  CodeEditorValidationSerivce,
  CodeExecutorService,
  JSExecutorService,
  TsTranspilerService
} from '../validation';
import {
  ChangeModelValueAction,
  ResultErrorAction,
  ResultSuccessAction
} from './editor-model.action';
import { EditorModelEffects } from './editor-model.effect';

describe('EditorModelEffects', () => {
  let actions$: TestActions;
  let effects: EditorModelEffects;
  let validationService: CodeEditorValidationSerivce;

  const modelState = {
    id: '0',
    progLang: ProgrammingLanguage.javascript,
    versionId: 0,
    value: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CodeEditorValidationSerivce,
        CodeExecutorService,
        JSExecutorService,
        TsTranspilerService,
        EditableMarkerService,
        EditorModelEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    validationService = TestBed.get(CodeEditorValidationSerivce);
    actions$ = TestBed.get(Actions);
    effects = TestBed.get(EditorModelEffects);
    const tsTranspilerService = TestBed.get(TsTranspilerService);

    spyOn(tsTranspilerService, 'run').and.returnValue('');
  });

  describe('validate$', () => {
    it('should fail validation for empty value', () => {
      const action = new ChangeModelValueAction(modelState);

      actions$.stream = hot('-a', { a: action });

      const validationErrors = [
        {
          message: validationService.emptyErrorMessage,
          startLineNumber: 1
        }
      ];

      const expected = cold('-b', {
        b: new ResultErrorAction('validation', modelState, validationErrors)
      });
      expect(effects.validate$).toBeObservable(expected);
    });
  });

  describe('execute$', () => {
    it('should execute on validation success', () => {
      const action = new ResultSuccessAction('validation', modelState);

      actions$.stream = hot('-a', { a: action });

      const expected = cold('-b', {
        b: new ResultSuccessAction('execution', modelState)
      });
      expect(effects.execute$).toBeObservable(expected);
    });
  });
});
