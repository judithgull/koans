import { Store, StoreModule } from '@ngrx/store';
import { EditorModelEntities } from './editor-model.reducer';
import { TestBed } from '@angular/core/testing';
import {
  codeEditorReducer,
  getValidationResult,
  ValidationResultAction,
  getModelEntity
} from '.';
import { FeedbackFactory, SourceType } from '../../common/model';

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
      const feedbackDetails = {
        success: true,
        message: 'message',
        startLineNumber: 1
      };
      store.dispatch(
        new ValidationResultAction({
          id: modelId,
          versionId: 1,
          value: '',
          validation: feedbackDetails
        })
      );
      expect(result).toEqual({
        id: modelId,
        versionId: 1,
        value: '',
        validation: feedbackDetails
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
