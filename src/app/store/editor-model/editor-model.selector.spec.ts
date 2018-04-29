import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import {
  getSelectedProgress,
  getSelectedProgresses,
  getValidationResult,
  ModelError,
  ModelValueChange,
  QuerySeriesSuccess,
  reducers,
  ModelSuccess,
} from '..';
import { mockSeries, testModelState } from '../../common/test';
import { ExerciseKey, ExerciseProgress, Feedback, ModelState, ProgrammingLanguage, SourceType } from '../../model';
import { EditorModelEntities } from './editor-model.reducer';

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

      store.dispatch(new QuerySeriesSuccess(mockSeries));

      const key = ExerciseKey.from(testModelState.id);

      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/series/2/e/1',
            queryParams: {},
            params: { id: key.seriesId, exId: key.exerciseId }
          },
          event: {}
        }
      });

      store.dispatch(new ModelValueChange(testModelState));
      expect(f).toBeTruthy();
    });

    it('should select empty progresses, if there is no series', () => {
      var f: ExerciseProgress[];
      store.select(getSelectedProgresses).subscribe(value => {
        f = value;
      });
      store.dispatch(new ModelValueChange(testModelState));
      expect(f).toEqual([]);
    });

    it('should select progresses of a series', () => {
      var f: ExerciseProgress[];
      store.select(getSelectedProgresses).subscribe(value => {
        f = value;
      });

      store.dispatch(new QuerySeriesSuccess(mockSeries));

      const key = ExerciseKey.from(testModelState.id);

      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/series/2/e/1',
            queryParams: {},
            params: { id: key.seriesId, exId: key.exerciseId }
          },
          event: {}
        }
      });

      store.dispatch(new ModelValueChange(testModelState));
      store.dispatch(new ModelSuccess('validation', testModelState));
      store.dispatch(new ModelSuccess('execution', testModelState));
      expect(f).toBeTruthy();
      expect(f.length).toBe(mockSeries[1].items.length);
      expect(f[0].valid).toEqual(true);
    });

  });

});
