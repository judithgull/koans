import { Store, StoreModule } from '@ngrx/store';
import { AppState } from '../app.state';
import { Subscription } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { reducers } from '../index';
import { UserQueries } from './user.reducer';
import { UserUpsertSuccess, UserSelectRequest } from './user.action';

describe('User Reducer and Selectors', () => {
  let store: Store<AppState>;
  const subs: Subscription[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)]
    });

    store = TestBed.get(Store);
  });

  afterEach(() => {
    subs.forEach(s => s.unsubscribe());
  });

  describe('all users', () => {
    it('is empty initially', (done: () => void) => {
      const all$ = store.select(UserQueries.all);

      subs.push(
        all$.subscribe(value => {
          expect(value).toEqual([]);
          done();
        })
      );
    });

    it('upserts a user', (done: () => void) => {
      const all$ = store.select(UserQueries.all);
      const testUser = { id: 'id', name: 'testName' };
      store.dispatch(new UserUpsertSuccess(testUser));
      subs.push(
        all$.subscribe(value => {
          expect(value).toEqual([testUser]);
          done();
        })
      );
    });

    it('selects the current user', (done: () => void) => {
      const currentUser$ = store.select(UserQueries.currentUser);
      const testUser = { id: 'id', name: 'testName' };
      store.dispatch(new UserUpsertSuccess(testUser));
      store.dispatch(new UserSelectRequest('id'));
      subs.push(
        currentUser$.subscribe(value => {
          expect(value).toEqual(testUser);
          done();
        })
      );
    });
  });
});
