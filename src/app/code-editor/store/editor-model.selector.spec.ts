import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import {
  ChangeModelValueAction,
  codeEditorReducer,
  getValidationResult,
  ResultErrorAction
} from '.';
import { ModelState, ProgrammingLanguage } from '../../model';
import { EditorModelEntities } from './editor-model.reducer';

describe('Editor Model Selectors', () => {
  let store: Store<EditorModelEntities>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...codeEditorReducer
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getValidationError', () => {
    it('should initially return no validation errors', () => {
      store.select(getValidationResult('')).subscribe(value => {
        expect(value).toBeFalsy();
      });
    });

    it('should return a validation error', () => {
      const modelId = 'model1';
      let result;
      store.select(getValidationResult(modelId)).subscribe(value => {
        result = value;
      });
      const errors = [
        {
          message: 'message',
          startLineNumber: 1
        }
      ];
      const modelState: ModelState = {
        id: modelId,
        versionId: 1,
        progLang: ProgrammingLanguage.javascript,
        value: ''
      };
      store.dispatch(new ChangeModelValueAction(modelState));
      store.dispatch(new ResultErrorAction('validation', modelState, errors));
      expect(result).toEqual({
        id: modelId,
        versionId: 1,
        value: '',
        progLang: ProgrammingLanguage.javascript,
        validation: {
          success: false,
          errors
        }
      });
    });

    // TODO
    // it('should not return other errors', () => {
    //   const modelId = 'model1';
    //   let result;
    //   store.select(getValidationResult(modelId)).subscribe(value => {
    //     result = value;
    //   });

    //   const feedback = {
    //     success: true,
    //     message: 'message',
    //     startLineNumber: 1
    //   };

    //   store.dispatch(
    //     new ValidationFailedAction({
    //       id: modelId,
    //       versionId: 1,
    //       value: '',
    //       runner: feedback
    //     })
    //   );
    //   expect(result).toBeFalsy();
    // });
  });
});
