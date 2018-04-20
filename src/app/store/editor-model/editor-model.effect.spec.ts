import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';

import { EditorModelState } from '..';
import { CodeEditorValidationSerivce, CodeExecutorService, JSExecutorService, TsTranspilerService } from '../../code-editor';
import { EditableMarkerService } from '../../common';
import { ProgrammingLanguage, SourceType } from '../../model';
import { getActions, TestActions } from '../test';
import { ChangeModelValueAction, ResultErrorAction, ResultSuccessAction } from './editor-model.action';
import { EditorModelEffects } from './editor-model.effect';

class StoreMock {
  select<K>(mapFn) {
    return null;
  }
}

describe('EditorModelEffects', () => {
  let actions$: TestActions;
  let effects: EditorModelEffects;
  let validationService: CodeEditorValidationSerivce;
  let store: Store<EditorModelState>;

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
        { provide: Actions, useFactory: getActions },
        { provide: Store, useClass: StoreMock }
      ]
    });

    validationService = TestBed.get(CodeEditorValidationSerivce);
    actions$ = TestBed.get(Actions);
    effects = TestBed.get(EditorModelEffects);
    const tsTranspilerService = TestBed.get(TsTranspilerService);
    store = TestBed.get(Store);

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
        b: new ResultErrorAction(
          SourceType.validation.toString(),
          modelState,
          validationErrors
        )
      });
      expect(effects.validate$).toBeObservable(expected);
    });
  });

  describe('execute$', () => {
    it('should execute on validation success', () => {
      const action = new ResultSuccessAction(SourceType.validation, modelState);

      actions$.stream = hot('-a', { a: action });

      const expected = cold('-b', {
        b: new ResultSuccessAction(SourceType.execution, modelState)
      });
      expect(effects.execute$).toBeObservable(expected);
    });
  });
});
