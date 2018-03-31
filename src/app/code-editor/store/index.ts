import { editorModelReducer } from './editor-model/editor-model.reducer';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { EditorModelEffects } from './editor-model/editor-model.effect';
import { EditorModelState } from './editor-model/editor-model-state';
import { jsLibsReducer, JsLibsEntities } from './js-libs/js-libs.reducer';
import { EditorModelEntities } from './editor-model';
import { JsLibsEffects } from './js-libs/js-libs.effect';

export interface CodeEditorState {
  editorModel: EditorModelEntities;
  jsLibs: JsLibsEntities;
}

export const codeEditorReducers: ActionReducerMap<CodeEditorState> = {
  editorModel: editorModelReducer,
  jsLibs: jsLibsReducer
};

export const effects: any[] = [EditorModelEffects, JsLibsEffects];

export * from './editor-model';
