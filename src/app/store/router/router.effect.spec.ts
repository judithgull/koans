import { RouterEffects } from './router.effect';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { expand } from 'rxjs/operators/expand';
import { hot, cold } from 'jasmine-marbles';
import { Back } from './router.action';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('RouterEffects', () => {
  let actions$: TestActions;
  let effects: RouterEffects;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        Location,
        { provide: Actions, useFactory: getActions },
        RouterEffects
      ]
    });

    actions$ = TestBed.get(Actions);
    effects = TestBed.get(RouterEffects);
    location = TestBed.get(Location);

    spyOn(location, 'back');
  });

  describe('back$', () => {
    it('should navigate back', () => {
      const action = new Back();

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-a', { a: action });

      expect(effects.back$).toBeObservable(expected);
      expect(location.back).toHaveBeenCalled();
    });
  });
});
