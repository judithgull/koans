import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CodeEditorComponent } from './code-editor.component';
import { MonacoLoaderService } from './monaco-loader.service';
import { editorModelReducer, effects, codeEditorReducers } from './store';
import {
  CodeEditorValidationSerivce,
  CodeExecutorService,
  JSExecutorService,
  TsTranspilerService
} from './validation';
import { MonacoLoadedGuard } from './monaco-loaded.guard';
import { JsLibsGuard } from './js-libs.guard';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('codeEditor', codeEditorReducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [CodeEditorComponent],
  exports: [CodeEditorComponent],
  providers: [
    MonacoLoaderService,
    JSExecutorService,
    CodeEditorValidationSerivce,
    CodeExecutorService,
    TsTranspilerService,
    MonacoLoadedGuard,
    JsLibsGuard
  ]
})
export class CodeEditorModule {}
