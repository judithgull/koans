import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CodeEditorComponent } from './code-editor.component';
import { MonacoLoaderService } from './monaco-loader.service';
import {
  JSExecutorService,
  CodeEditorValidationSerivce,
  CodeExecutorService,
  TsTranspilerService
} from './validation';
import { Store, StoreModule } from '@ngrx/store';
import { codeEditorModel, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('editorModel', codeEditorModel),
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
