import { RouterEffects } from './router.effect';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Home, Go } from './router.action';
import { RouterTestingModule } from '@angular/router/testing';
import { TestActions, getActions } from '../test/test.actions';
import { Router } from '@angular/router';

describe('RouterEffects', () => {
  let actions$: TestActions;
  let effects: RouterEffects;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: Actions, useFactory: getActions }, RouterEffects]
    });

    actions$ = TestBed.get(Actions);
    effects = TestBed.get(RouterEffects);
    router = TestBed.get(Router);

    spyOn(router, 'navigate');
  });

  describe('home$', () => {
    it('should navigate home', () => {
      const action = new Home();

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: new Go({ path: ['/'] }) });

      expect(effects.home$).toBeObservable(expected);
    });
  });

  describe('navigate$', () => {
    it('should navigate$', () => {
      const path = [];
      const action = new Go({ path });

      actions$.stream = hot('-a', { a: action });

      const expected = cold('-b', { b: action.payload });
      expect(effects.navigate$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith(path, {
        queryParams: undefined
      });
    });
  });
});
