import { editorModelReducer } from './editor-model/editor-model.reducer';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { EditorModelEffects } from './editor-model/editor-model.effect';
import { EditorModelState } from './editor-model/editor-model-state';
import { EditorModelEntities } from './editor-model';

export interface CodeEditorState {
  editorModel: EditorModelEntities;
}

export const codeEditorReducers: ActionReducerMap<CodeEditorState> = {
  editorModel: editorModelReducer
};

export const effects: any[] = [EditorModelEffects];

export * from './editor-model';
