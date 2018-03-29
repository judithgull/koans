import { editorModelReducer } from './editor-model.reducer';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { EditorModelEffects } from './editor-model.effect';
import { EditorModelState } from './editor-model-state';

export const codeEditorReducer: ActionReducerMap<EditorModelState> = {
  editorModel: editorModelReducer
};

export const effects: any[] = [EditorModelEffects];

export * from './editor-model.reducer';
export * from './editor-model.action';
export * from './editor-model.selector';
export * from './editor-model-state';
