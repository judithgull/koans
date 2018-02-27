import { TestBed } from '@angular/core/testing';
import { EditorModelEffects } from './editor-model.effect';
import {
  ChangeModelValueAction,
  ValidationResultAction,
  MonacoSuccessAction,
  ExecutorSuccessAction
} from './editor-model.action';
import { hot, cold } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { getActions, TestActions } from '../../store/test';
import {
  CodeEditorValidationSerivce,
  CodeExecutorService,
  JSExecutorService,
  TsTranspilerService
} from '../validation';
import { EditableMarkerService } from '../../common/editable-marker.service';
import { ProgrammingLanguage } from '../../common/model';
import { ExecutorErrorAction } from '.';

describe('EditorModelEffects', () => {
  let actions$: TestActions;
  let effects: EditorModelEffects;
  let validationService: CodeEditorValidationSerivce;

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
      const action = new ChangeModelValueAction({
        id: '0',
        versionId: 0,
        value: ''
      });

      actions$.stream = hot('-a', { a: action });

      const expected = cold('-b', {
        b: new ValidationResultAction({
          id: '0',
          versionId: 0,
          value: '',
          validation: {
            success: false,
            errors: [
              {
                message: validationService.emptyErrorMessage,
                startLineNumber: -1
              }
            ]
          }
        })
      });
      expect(effects.validate$).toBeObservable(expected);
    });
  });

  describe('execute$', () => {
    it('should execute on monaco success', () => {
      const action = new MonacoSuccessAction({
        id: '0',
        versionId: 0,
        value: 'asdf',
        prodLang: ProgrammingLanguage.typescript
      });

      actions$.stream = hot('-a', { a: action });

      const expected = cold('-b', {
        b: new ExecutorSuccessAction({
          id: '0',
          versionId: 0,
          value: 'asdf',
          prodLang: ProgrammingLanguage.typescript
        })
      });
      expect(effects.execute$).toBeObservable(expected);
    });
  });
});
