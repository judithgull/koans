import { JSLibsAction, LOAD_LIB_SUCCESS } from './js-libs.action';

export interface JsLibsEntities {
  entities: { [id: string]: string };
}

export const initialState: JsLibsEntities = {
  entities: {}
};

export function jsLibsReducer(
  state: JsLibsEntities = initialState,
  action: JSLibsAction
): JsLibsEntities {
  switch (action.type) {
    case LOAD_LIB_SUCCESS:
      return {
        entities: {
          ...state.entities,
          [action.path]: action.lib
        }
      };
  }
  return state;
}
