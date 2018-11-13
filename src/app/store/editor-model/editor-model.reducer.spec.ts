import { ModelValueChange, ModelError, ModelSuccess, ModelToggleSolutionAction, reducers, EditorModelQueries, SeriesQuerySuccess, SeriesSelectAction, ExerciseSelectAction } from '..';
import { ErrorMarker, FeedbackDetails, ProgrammingLanguage, SourceType, ExerciseKey, ModelState, Feedback, ExerciseProgress } from '../../model';
import { editorModelReducer, EM_INITIAL_STATE } from './editor-model.reducer';
import { mockSeries, testModelState } from '../../common/test';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { AppState } from '../app.state';
import { ModelInitAction } from './editor-model.action';
import { Subscription } from 'rxjs';

describe('Editor Model Selectors', () => {
  let store: Store<AppState>;
  const subs: Subscription[] = [];

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

  afterEach(() => {
    subs.forEach(s => s.unsubscribe());
  });

  describe('ModelInitAction initializes Entities', () => {

    it('selects no progress initially', () => {
      store.select(EditorModelQueries.getSelectedProgress).subscribe(value => {
        expect(value).toBeFalsy();
      });
    });

    it('selects empty progresses, if there is no series', () => {
      var f: ExerciseProgress[];
      store.select(EditorModelQueries.getSelectedProgresses).subscribe(value => {
        f = value;
      });
      store.dispatch(new ModelValueChange(testModelState));
      expect(f).toEqual([]);
    });

    it('initializes some entities', done => {
      const i1 = { id: '1', progLang: ProgrammingLanguage.typescript, value: 'asdf', versionId: 1 };
      store.dispatch(new ModelInitAction([i1]));
      const entitie$ = store.select(EditorModelQueries.entities);

      subs.push(entitie$.subscribe(
        value => {
          expect(value).toEqual({
            [i1.id]: {
              ...i1,
              valid: false,
              solutionRequested: false,
              solutionVisible: false
            }
          });
          done();
        }));
    });

    it('selects a progress, when the model is initialized', () => {
      var f: Feedback;
      store.select(EditorModelQueries.getSelectedProgress).subscribe(value => {
        f = value;
      });
      store.dispatch(new SeriesQuerySuccess(mockSeries));
      store.dispatch(new SeriesSelectAction('2'));
      store.dispatch(new ExerciseSelectAction(1));

      store.dispatch(new ModelInitAction([testModelState]));
      expect(f).toBeTruthy();
    });

    describe('Value Change', () => {
      it('changes the value on valueChange', () => {
        var f: Feedback;
        store.select(EditorModelQueries.getSelectedProgress).subscribe(value => {
          f = value;
        });
        store.dispatch(new SeriesQuerySuccess(mockSeries));
        store.dispatch(new SeriesSelectAction('2'));
        store.dispatch(new ExerciseSelectAction(1));
        store.dispatch(new ModelInitAction([testModelState]));
        store.dispatch(new ModelValueChange({ ...testModelState, versionId: 2 }));
        expect(f).toBeTruthy();
        expect(f.versionId).toBe(2);
      });

      it('ignores older valueChange', () => {
        var f: Feedback;
        store.select(EditorModelQueries.getSelectedProgress).subscribe(value => {
          f = value;
        });
        store.dispatch(new SeriesQuerySuccess(mockSeries));
        store.dispatch(new SeriesSelectAction('2'));
        store.dispatch(new ExerciseSelectAction(1));
        store.dispatch(new ModelInitAction([testModelState]));
        store.dispatch(new ModelValueChange({ ...testModelState, versionId: 2, value: 'a' }));
        store.dispatch(new ModelValueChange({ ...testModelState, versionId: 1, value: 'b' }));
        expect(f).toBeTruthy();
        expect(f.value).toBe('a');
      });
    });
  });


  describe('Toggle Solution', () => {

    it('ignores toggle, if entity is not available', () => {
      var f: Feedback;
      store.select(EditorModelQueries.getSelectedProgress).subscribe(value => {
        f = value;
      });
      store.dispatch(new SeriesQuerySuccess(mockSeries));
      store.dispatch(new SeriesSelectAction('2'));
      store.dispatch(new ExerciseSelectAction(1));
      store.dispatch(new ModelToggleSolutionAction(new ExerciseKey(2, 1)));
      expect(f).toBeUndefined();
    });

    it('toggles solution flag', () => {
      var f: Feedback;
      store.select(EditorModelQueries.getSelectedProgress).subscribe(value => {
        f = value;
      });
      store.dispatch(new SeriesQuerySuccess(mockSeries));
      store.dispatch(new SeriesSelectAction('2'));
      store.dispatch(new ExerciseSelectAction(1));
      store.dispatch(new ModelInitAction([testModelState]));
      store.dispatch(new ModelToggleSolutionAction(new ExerciseKey(2, 1)));
      expect(f.solutionVisible).toBeTruthy();
      expect(f.solutionRequested).toBeTruthy();
    });

    it('toggles solution flag twice and updates solution requested flag', () => {
      var f: Feedback;
      store.select(EditorModelQueries.getSelectedProgress).subscribe(value => {
        f = value;
      });
      store.dispatch(new SeriesQuerySuccess(mockSeries));
      store.dispatch(new SeriesSelectAction('2'));
      store.dispatch(new ExerciseSelectAction(1));
      store.dispatch(new ModelInitAction([testModelState]));
      store.dispatch(new ModelToggleSolutionAction(new ExerciseKey(2, 1)));
      store.dispatch(new ModelToggleSolutionAction(new ExerciseKey(2, 1)));
      expect(f.solutionVisible).toBeFalsy();
      expect(f.solutionRequested).toBeTruthy();
    });

  });
});
/*
    describe('getValidationError', () => {
      it('should initially return no validation errors', () => {
        store.select(EditorModelQueries.getValidationResult('')).subscribe(value => {
          expect(value).toBeFalsy();
        });
      });

      it('should return a validation error', () => {
        const modelId = 'model1';
        let result: Feedback;
        const selector = EditorModelQueries.getValidationResult(modelId);
        store.select(selector).subscribe(value => {
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

      it('should select progresses of a series', () => {
        var f: ExerciseProgress[];
        store.select(EditorModelQueries.getSelectedProgresses).subscribe(value => {
          f = value;
        });

        store.dispatch(new SeriesQuerySuccess(mockSeries));
        store.dispatch(new SeriesSelectAction('2'));
        store.dispatch(new ModelValueChange(testModelState));
        store.dispatch(new ModelSuccess('validation', testModelState));
        store.dispatch(new ModelSuccess('execution', testModelState));
        expect(f).toBeTruthy();
        expect(f.length).toBe(mockSeries[1].items.length);
        expect(f[0].valid).toEqual(true);
      });

    });

  });

  describe('editorModelReducer', () => {
    const errors = [
      {
        message: 'error',
        startLineNumber: 1
      }
    ];
    const errorDetails: FeedbackDetails = {
      success: false,
      errors
    };
    const errorMarkers2: ErrorMarker[] = [
      {
        message: 'error2',
        startLineNumber: -1
      }
    ];
    const changeValueAction = new ModelValueChange({
      id: 'id1',
      versionId: 0,
      value: 'value',
      progLang: ProgrammingLanguage.javascript
    });

    const entity1 = {
      id: 'id1',
      versionId: 0,
      value: 'value',
      progLang: ProgrammingLanguage.javascript,
      valid: false,
      solutionRequested: false,
      solutionVisible: false
    };

    const entity2 = {
      id: 'id2',
      versionId: 0,
      value: 'value',
      progLang: ProgrammingLanguage.typescript,
      valid: false,
      solutionRequested: false,
      solutionVisible: false
    };

    describe('Default State', () => {
      it('should return the initial state', () => {
        const action: any = {};
        const state = editorModelReducer(undefined, action);
        expect(state).toBe(EM_INITIAL_STATE);
      });
    });

    describe('Validation', () => {

      it('ignores success, if there is no value', () => {
        const action = new ModelSuccess('unknown', testModelState);
        const state = editorModelReducer(
          EM_INITIAL_STATE,
          action
        );
      });

      it('ignores error, if there is no value', () => {
        const action = new ModelError('unknown', testModelState, []);
        const state = editorModelReducer(
          EM_INITIAL_STATE,
          action
        );
      });


      it('should update failed validation', () => {
        const initialEntity = {
          id1: entity1
        };

        const action = new ModelError(
          SourceType.validation,
          {
            id: 'id1',
            versionId: 0,
            value: 'value1',
            progLang: ProgrammingLanguage.typescript
          },
          errors
        );
        const state = editorModelReducer(
          { entities: { ...initialEntity } },
          action
        );
        expect(state).toEqual({
          entities: {
            id1: {
              ...entity1,
              validation: errorDetails,
              valid: false
            }
          }
        });
      });

      it('should reset validation result on change', () => {
        const initialEntity = {
          id1: {
            id: 'id1',
            versionId: 0,
            value: 'value',
            progLang: ProgrammingLanguage.typescript,
            validation: errorDetails,
            valid: false,
            solutionRequested: false,
            solutionVisible: false
          }
        };

        const action = new ModelValueChange({
          id: 'id1',
          versionId: 1,
          value: 'value2',
          progLang: ProgrammingLanguage.typescript
        });
        const state = editorModelReducer(
          { entities: { ...initialEntity } },
          action
        );
        expect(state).toEqual({
          entities: {
            id1: {
              id: 'id1',
              versionId: 1,
              value: 'value2',
              progLang: ProgrammingLanguage.typescript,
              valid: false,
              solutionRequested: false,
              solutionVisible: false
            }
          }
        });
      });

    });

    describe('Monaco', () => {
      it('should update monaco result on change', () => {
        const initialEntity = {
          id1: {
            id: 'id1',
            versionId: 0,
            value: 'value',
            progLang: ProgrammingLanguage.typescript,
            validation: errorDetails,
            valid: false,
            solutionRequested: false,
            solutionVisible: false
          }
        };

        const action = new ModelError(
          SourceType.monaco,
          {
            id: 'id1',
            versionId: 0,
            value: 'value',
            progLang: ProgrammingLanguage.typescript
          },
          errorMarkers2
        );

        const state = editorModelReducer(
          { entities: { ...initialEntity } },
          action
        );
        expect(state).toEqual({
          entities: {
            id1: {
              id: 'id1',
              versionId: 0,
              value: 'value',
              progLang: ProgrammingLanguage.typescript,
              validation: errorDetails,
              monaco: {
                success: false,
                errors: errorMarkers2
              },
              valid: false,
              solutionRequested: false,
              solutionVisible: false
            }
          }
        });
      });
      it('should update monaco success on change', () => {
        const initialEntity = {
          id1: {
            id: 'id1',
            versionId: 0,
            value: 'value',
            progLang: ProgrammingLanguage.typescript,
            validation: errorDetails,
            valid: false,
            solutionRequested: false,
            solutionVisible: false
          }
        };

        const action = new ModelSuccess(SourceType.monaco, {
          id: 'id1',
          versionId: 0,
          value: 'value',
          progLang: ProgrammingLanguage.typescript
        });

        const state = editorModelReducer(
          { entities: { ...initialEntity } },
          action
        );
        expect(state).toEqual({
          entities: {
            id1: {
              id: 'id1',
              versionId: 0,
              value: 'value',
              progLang: ProgrammingLanguage.typescript,
              validation: errorDetails,
              monaco: {
                success: true,
                errors: []
              },
              valid: false,
              solutionRequested: false,
              solutionVisible: false
            }
          }
        });
      });
    });

    describe('Execution', () => {
      it('should update state to valid, if everything passes', () => {
        const success = {
          success: true,
          errors: []
        };
        const initialEntity = {
          id1: {
            id: 'id1',
            versionId: 0,
            value: 'value',
            progLang: ProgrammingLanguage.typescript,
            validation: success,
            valid: false,
            solutionRequested: false,
            solutionVisible: false
          }
        };

        const action = new ModelSuccess(SourceType.execution, {
          id: 'id1',
          versionId: 0,
          value: 'value',
          progLang: ProgrammingLanguage.typescript
        });

        const state = editorModelReducer(
          { entities: { ...initialEntity } },
          action
        );
        expect(state).toEqual({
          entities: {
            id1: {
              id: 'id1',
              versionId: 0,
              value: 'value',
              progLang: ProgrammingLanguage.typescript,
              validation: success,
              execution: success,
              valid: true,
              solutionRequested: false,
              solutionVisible: false
            }
          }
        });
      });
    });
    describe('ModelSolutionToggle action', () => {
      it('toggle solution initially', () => {
        const key = new ExerciseKey(1, 2);

        const action = new ModelToggleSolutionAction(key);

        const state = editorModelReducer(EM_INITIAL_STATE, action);
        const path = key.exercisePath;
        expect(state.entities[path]).toBeUndefined();
      });

      it('toggles solution after value change', () => {
        const key = new ExerciseKey(1, 2);

        const modelState: ModelState = {
          id: key.exercisePath,
          versionId: 0,
          progLang: ProgrammingLanguage.typescript,
          value: 'x'
        }

        const valueChange = new ModelValueChange(modelState);

        const action = new ModelToggleSolutionAction(key);

        const state1 = editorModelReducer(EM_INITIAL_STATE, valueChange);
        const state = editorModelReducer(state1, action);

        const path = key.exercisePath;
        expect(state.entities[path]).toBeDefined();
        expect(state.entities[path].solutionRequested).toBe(true);
        expect(state.entities[path].solutionVisible).toBe(true);
      });

      it('toggles solution invisible when toggeling twice', () => {
        const key = new ExerciseKey(1, 2);

        const modelState: ModelState = {
          id: key.exercisePath,
          versionId: 0,
          progLang: ProgrammingLanguage.typescript,
          value: 'x'
        }

        const valueChange = new ModelValueChange(modelState);

        const action = new ModelToggleSolutionAction(key);

        const state1 = editorModelReducer(EM_INITIAL_STATE, valueChange);
        const state2 = editorModelReducer(state1, action);
        const state = editorModelReducer(state2, action);

        const path = key.exercisePath;
        expect(state.entities[path]).toBeDefined();
        expect(state.entities[path].solutionRequested).toBe(true);
        expect(state.entities[path].solutionVisible).toBe(false);
      });

    });

  });

  */
