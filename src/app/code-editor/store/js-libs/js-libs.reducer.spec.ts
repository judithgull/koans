import { jsLibsReducer, initialState } from './js-libs.reducer';
import { LoadJsLib, LoadLibSuccess } from '.';

describe('JSLibs Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action: any = {};
      const state = jsLibsReducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('Load Libs action', () => {
    it('should not change state for load libs action', () => {
      const path = 'path';
      const action = new LoadJsLib(path);
      const state = jsLibsReducer(initialState, action);
      expect(state.entities).toEqual({});
    });

    it('update state for LoadLibsSuccess', () => {
      const path = 'path';
      const lib = 'lib';
      const action = new LoadLibSuccess(path, lib);
      const state = jsLibsReducer(initialState, action);
      expect(state.entities).toEqual({ path: lib });
    });
  });
});
