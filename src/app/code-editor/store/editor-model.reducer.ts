import {
  EditorModelAction,
  CHANGE_MODEL_VALUE_ACTION
} from './editor-model.action';

export interface EditorModelState {
  id: string;
  versionId: number;
  value: string;
}

export interface EditorModelEntities {
  entities: {
    [id: string]: EditorModelState;
  };
}

export const initialState: EditorModelEntities = {
  entities: {}
};

export function editorModelReducer(
  state = initialState,
  action: EditorModelAction
): EditorModelEntities {
  switch (action.type) {
    case CHANGE_MODEL_VALUE_ACTION:
      const payload = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.id]: payload
        }
      };
  }
  return state;
}
