import { EditorModelAction } from './validate-exercise.action';

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
  }
  return state;
}
