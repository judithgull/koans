import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CodeEditorComponent } from './code-editor.component';
import { MonacoLoaderService } from './monaco-loader.service';
import {
  JSExecutorService,
  CodeEditorValidationSerivce,
  CodeExecutorService
} from './validation';
import { TsTranspilerService } from './validation/ts-transpiler.service';

@NgModule({
  imports: [CommonModule],
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
