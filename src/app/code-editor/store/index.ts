import {
  EditorModelEntities,
  editorModelReducer
} from './validate-exercise.reducer';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { EditorModelEffects } from './editor-model.effect';

export interface EditorModelState {
  editorModel: EditorModelEntities;
}

export const getEditorModelState = createFeatureSelector<EditorModelState>(
  'editorModel'
);

export const codeEditorModel: ActionReducerMap<EditorModelState> = {
  editorModel: editorModelReducer
};

export const effects: any[] = [EditorModelEffects];

export * from './validate-exercise.reducer';
export * from './validate-exercise.action';
