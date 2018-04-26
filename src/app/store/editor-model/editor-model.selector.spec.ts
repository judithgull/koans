import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { ModelValueChange, getValidationResult, reducers, ModelError, getSelectedProgress, QuerySeriesSuccess } from '..';
import { ModelState, ProgrammingLanguage, SourceType, Feedback } from '../../model';
import { EditorModelEntities } from './editor-model.reducer';
import { mockSeries } from '../../common/test';

describe('Editor Model Selectors', () => {
  let store: Store<EditorModelEntities>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...reducers
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
      store.dispatch(new ModelValueChange(modelState));
      store.dispatch(
        new ModelError(
          SourceType.validation.toString(),
          modelState,
          errors
        )
      );
      expect(result).toEqual({
        id: modelId,
        versionId: 1,
        value: '',
        progLang: ProgrammingLanguage.javascript,
        validation: {
          success: false,
          errors
        },
        valid: false,
        solutionRequested: false,
        solutionVisible: false
      });
    });
  });

  describe('getSelectedProgress', () => {
    it('should initially return no progress', () => {
      store.select(getSelectedProgress).subscribe(value => {
        expect(value).toBeFalsy();
      });
    });

    it('should return a progress', () => {
      var f: Feedback;
      store.select(getSelectedProgress).subscribe(value => {
        f = value;
      });

      const modelState: ModelState = {
        id: '2/1/exercise',
        versionId: 0,
        progLang: ProgrammingLanguage.typescript,
        value: 'x'
      }

      store.dispatch(new QuerySeriesSuccess(mockSeries));

      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/series/2/e/1',
            queryParams: {},
            params: { id: '2', exId: '1' }
          },
          event: {}
        }
      });


      store.dispatch(new ModelValueChange(modelState));
      expect(f).toBeTruthy();
    });

  });

});
