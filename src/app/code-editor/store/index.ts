import {
  EditorModelEntities,
  editorModelReducer
} from './editor-model.reducer';
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

export * from './editor-model.reducer';
export * from './editor-model.action';
