import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';

import { EditorModelState } from '..';
import { CodeEditorValidationSerivce, CodeExecutorService, JSExecutorService, TsTranspilerService } from '../../code-editor';
import { EditableMarkerService } from '../../common';
import { ProgrammingLanguage, SourceType } from '../../model';
import { getActions, TestActions } from '../test';
import { ModelValueChange, ModelError, ModelSuccess, ModelInitAction, ModelValidateAction } from './editor-model.action';
import { EditorModelEffects } from './editor-model.effect';
import { mockSeries } from '../../common/test';
import { SeriesLoadSuccess, SeriesQuerySuccess } from '../series/series.action';

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
  });

  describe('validate$', () => {
    it('validation is triggered after value change', () => {
      const action = new ModelValueChange(modelState);

      actions$.stream = hot('-a', { a: action });

      const expected = cold('-b', {
        b: new ModelValidateAction(
          modelState
        )
      });
      expect(effects.triggerValidateOnValueChange$).toBeObservable(expected);
    });


    it('should fail validation for empty value', () => {
      const action = new ModelValidateAction(modelState);

      actions$.stream = hot('-a', { a: action });

      const validationErrors = [
        {
          message: validationService.emptyErrorMessage,
          startLineNumber: 1
        }
      ];

      const expected = cold('-b', {
        b: new ModelError(
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
      const action = new ModelSuccess(SourceType.validation, modelState);

      actions$.stream = hot('-a', { a: action });

      const expected = cold('-b', {
        b: new ModelSuccess(SourceType.execution, modelState)
      });
      expect(effects.execute$).toBeObservable(expected);
    });
  });


  describe('initModel$', () => {
    it('triggers model init after loading a series successfully', () => {
      const series = mockSeries[0];
      const action = new SeriesLoadSuccess(series);

      actions$.stream = hot('-a', { a: action });

      const expected = cold('-b', { b: new  ModelInitAction([
        {id: '1/1/exercise', progLang: ProgrammingLanguage.typescript, value: series.items[0].exercise, versionId: 1 },
        {id: '1/1/solution', progLang: ProgrammingLanguage.typescript, value: series.items[0].solution, versionId: 1 },
        {id: '1/2/exercise', progLang: ProgrammingLanguage.typescript, value: series.items[1].exercise, versionId: 1 },
        {id: '1/2/solution', progLang: ProgrammingLanguage.typescript, value: series.items[1].solution, versionId: 1 },
        {id: '1/3/exercise', progLang: ProgrammingLanguage.typescript, value: series.items[2].exercise, versionId: 1 },
        {id: '1/3/solution', progLang: ProgrammingLanguage.typescript, value: series.items[2].solution, versionId: 1 },
        ])});
      expect(effects.initModel$).toBeObservable(expected);
    });

    it('triggers model init after loading multiple series successfully', () => {
      const action = new SeriesQuerySuccess(mockSeries);

      actions$.stream = hot('-a', { a: action });

      const expected = cold('-b', { b: new  ModelInitAction([
        {id: '1/1/exercise', progLang: ProgrammingLanguage.typescript, value: mockSeries[0].items[0].exercise, versionId: 1 },
        {id: '1/1/solution', progLang: ProgrammingLanguage.typescript, value: mockSeries[0].items[0].solution, versionId: 1 },
        {id: '1/2/exercise', progLang: ProgrammingLanguage.typescript, value: mockSeries[0].items[1].exercise, versionId: 1 },
        {id: '1/2/solution', progLang: ProgrammingLanguage.typescript, value: mockSeries[0].items[1].solution, versionId: 1 },
        {id: '1/3/exercise', progLang: ProgrammingLanguage.typescript, value: mockSeries[0].items[2].exercise, versionId: 1 },
        {id: '1/3/solution', progLang: ProgrammingLanguage.typescript, value: mockSeries[0].items[2].solution, versionId: 1 },
        {id: '2/1/exercise', progLang: ProgrammingLanguage.typescript, value: mockSeries[1].items[0].exercise, versionId: 1 },
        {id: '2/1/solution', progLang: ProgrammingLanguage.typescript, value: mockSeries[1].items[0].solution, versionId: 1 },
        {id: '2/2/exercise', progLang: ProgrammingLanguage.typescript, value: mockSeries[1].items[1].exercise, versionId: 1 },
        {id: '2/2/solution', progLang: ProgrammingLanguage.typescript, value: mockSeries[1].items[1].solution, versionId: 1 },
        ])});
      expect(effects.initModelQuery$).toBeObservable(expected);
    });

  });

});
