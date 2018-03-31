import { TestActions, getActions } from '../../../store/test';
import { JsLibsService } from '../../../common';
import { JsLibsEffects } from './js-libs.effect';
import { TestBed } from '@angular/core/testing';
import { Actions, Effect } from '@ngrx/effects';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/observable/of';
import { LoadLibSuccess, LoadJsLib } from '.';
import { hot, cold } from 'jasmine-marbles';

describe('JsLibsEffects', () => {
  let actions$: TestActions;
  let service: JsLibsService;
  let effects: JsLibsEffects;
  const lib = 'lib';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JsLibsService,
        JsLibsEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(JsLibsService);
    effects = TestBed.get(JsLibsEffects);

    spyOn(service, 'get').and.returnValue(of(lib));
  });

  describe('loadJsLib$', () => {
    it('should return LoadLibSuccess', () => {
      const path = 'path';
      const action = new LoadJsLib(path);

      actions$.stream = hot('-a', { a: action });

      const completionAction = new LoadLibSuccess(path, lib);
      const expected = cold('-b', { b: completionAction });

      expect(effects.loadJsLib$).toBeObservable(expected);
    });
  });
});
