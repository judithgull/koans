import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CodeEditorComponent } from './code-editor.component';
import { MonacoLoaderService } from './monaco-loader.service';
import { editorModelReducer, effects } from './store';
import {
  CodeEditorValidationSerivce,
  CodeExecutorService,
  JSExecutorService,
  TsTranspilerService
} from './validation';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('editorModel', editorModelReducer),
    EffectsModule.forFeature(effects)
  ],
  declarations: [CodeEditorComponent],
  exports: [CodeEditorComponent],
  providers: [
    MonacoLoaderService,
    JSExecutorService,
    CodeEditorValidationSerivce,
    CodeExecutorService,
    TsTranspilerService
  ]
})
export class CodeEditorModule {}
