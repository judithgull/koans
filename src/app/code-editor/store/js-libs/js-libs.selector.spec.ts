import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { CodeEditorState, codeEditorReducers } from '..';
import { getLibsEntities, getLib } from './js-libs.selector';
import { LoadLibSuccess } from './js-libs.action';
import * as rootStore from '../../../store';
import * as codeEditorStore from '../';

describe('Series Selectors', () => {
  let store: Store<CodeEditorState>;
  const path = 'p';
  const lib = 'l';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...rootStore.reducers,
          codeEditor: combineReducers(codeEditorStore.codeEditorReducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getEntities', () => {
    it('should initially return empty entities', () => {
      store.select(getLibsEntities).subscribe(value => {
        expect(value).toEqual({});
      });
    });

    it('should return the libs as entities', () => {
      let result;
      store.select(getLibsEntities).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadLibSuccess(path, lib));
      expect(result).toEqual({ [path]: lib });
    });
  });

  describe('getLib', () => {
    it('should be undefined, if there are no libs of a given path', () => {
      let result = '1';
      store.select(getLib(path)).subscribe(value => {
        result = value;
      });
      expect(result).toBeFalsy();
    });

    it('should return the lib of a given path', () => {
      let result;
      store.select(getLib(path)).subscribe(value => {
        result = value;
      });
      store.dispatch(new LoadLibSuccess(path, lib));
      expect(result).toEqual(lib);
    });
  });
});
