import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CodeEditorComponent } from './code-editor.component';
import { MonacoLoaderService } from './monaco-loader.service';
import {
  CodeEditorValidationSerivce,
  CodeExecutorService,
  JSExecutorService,
  TsTranspilerService
} from './validation';
import { MonacoLoadedGuard } from './monaco-loaded.guard';

@NgModule({
  imports: [CommonModule],
  declarations: [CodeEditorComponent],
  exports: [CodeEditorComponent],
  providers: [
    MonacoLoaderService,
    JSExecutorService,
    CodeEditorValidationSerivce,
    CodeExecutorService,
    TsTranspilerService,
    MonacoLoadedGuard
  ]
})
export class CodeEditorModule {}
