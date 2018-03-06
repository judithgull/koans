import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { of } from 'rxjs/observable/of';

import { ExerciseSolved, SeriesCompleted } from '.';
import { RunnerState } from '..';
import { getActions, TestActions } from '../../../store/test';
import { ProgressEffects } from './progress.effect';

class StoreMock {
  select<K>(mapFn: (state: RunnerState) => K): Store<K> {
    return null;
  }
}

describe('ProgressEffects', () => {
  let actions$: TestActions;
  let effects: ProgressEffects;
  let store: Store<RunnerState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProgressEffects,
        { provide: Actions, useFactory: getActions },
        { provide: Store, useClass: StoreMock }
      ]
    });

    actions$ = TestBed.get(Actions);
    effects = TestBed.get(ProgressEffects);
    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(of([]));
  });

  describe('navigateNextUnsolved$', () => {
    it('should navigate to the next unsolved exercise upon solved', () => {
      const action = new ExerciseSolved({
        seriesId: 0,
        id: 0,
        userSolution: ''
      });

      actions$.stream = hot('-a', { a: action });

      const expected = cold('-b', { b: new SeriesCompleted(0) });
      expect(effects.navigateNextUnsolved$).toBeObservable(expected);
    });
  });
});
