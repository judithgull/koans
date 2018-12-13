import { ModelValueChange, ModelError, ModelToggleSolutionAction, reducers, EditorModelQueries, SeriesQuerySuccess, SeriesSelectAction, ExerciseSelectAction, SeriesQueries } from '..';
import { FeedbackDetails, ProgrammingLanguage, SourceType, ExerciseKey,  Feedback, ExerciseProgress } from '../../model';
import { mockSeries, testModelState } from '../../common/test';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { AppState } from '../app.state';
import { ModelInitAction, ModelSuccess } from './editor-model.action';
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
      store.dispatch(new ModelToggleSolutionAction(new ExerciseKey('2', 1)));
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
      store.dispatch(new ModelToggleSolutionAction(new ExerciseKey('2', 1)));
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
      store.dispatch(new ModelToggleSolutionAction(new ExerciseKey('2', 1)));
      store.dispatch(new ModelToggleSolutionAction(new ExerciseKey('2', 1)));
      expect(f.solutionVisible).toBeFalsy();
      expect(f.solutionRequested).toBeTruthy();
    });
  });


  describe('Error', () => {

    it('adds an execution error', () => {
      const errors = [
        {
          message: 'message',
          startLineNumber: 1
        }
      ];

      var f: FeedbackDetails;
      store.select(EditorModelQueries.getFeedbackDetails(testModelState.id, SourceType.execution, testModelState.versionId)).subscribe(value => {
        f = value;
      });
      store.dispatch(new ModelInitAction([testModelState]));
      store.dispatch(new ModelError(SourceType.execution, testModelState, errors));

      const errorFeedback:FeedbackDetails = {
        success:false,
        errors
      }

      expect(f).toEqual(errorFeedback);
    });

    it('does not add errors for old execution version', () => {
      const errors = [
        {
          message: 'message',
          startLineNumber: 1
        }
      ];

      var f: FeedbackDetails;
      store.select(EditorModelQueries.getFeedbackDetails(testModelState.id, SourceType.execution, testModelState.versionId)).subscribe(value => {
        f = value;
      });
      store.dispatch(new ModelInitAction([testModelState]));
      store.dispatch(new ModelError(SourceType.execution, {...testModelState, versionId: testModelState.versionId-1}, errors));

      expect(f).toBeUndefined();
    });
  });

  describe('Success', () => {
    it('does not add errors for old execution version', () => {
      const errors = [
        {
          message: 'message',
          startLineNumber: 1
        }
      ];
      var f: FeedbackDetails;
      store.select(EditorModelQueries.getFeedbackDetails(testModelState.id, SourceType.execution, testModelState.versionId)).subscribe(value => {
        f = value;
      });
      store.dispatch(new ModelInitAction([testModelState]));
      store.dispatch(new ModelError(SourceType.execution, {...testModelState, versionId: testModelState.versionId-1}, errors));
      store.dispatch(new ModelSuccess(SourceType.execution, testModelState));

      expect(f.success).toBeTruthy();
      expect(f.errors).toEqual([]);
    });
  });


  describe('Selected Progresses', () => {
    it('is empty, if no series is selected', () => {
      var f: ExerciseProgress[];
      store.select(EditorModelQueries.getSelectedProgresses).subscribe(value => {
        f = value;
      });

      expect(f).toEqual([]);
    });

    it('returns initial selected progresses', () => {
      let f: ExerciseProgress[];
      store.select(EditorModelQueries.getSelectedProgresses).subscribe(value => {
        f = value;
      });

      store.dispatch(new SeriesQuerySuccess(mockSeries));
      store.dispatch(new SeriesSelectAction('2'));
      store.dispatch(new ModelInitAction([testModelState, {...testModelState, id: '2/2/exercise'}]));

      const initialProgress = {
        solutionRequested: false,
        solutionVisible: false,
        valid: false,
        solved: false
      };
      expect(f).toEqual([initialProgress, initialProgress]);
    });
  });

});
