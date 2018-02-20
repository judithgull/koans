import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CodeEditorComponent } from './code-editor.component';
import { MonacoLoaderService } from './monaco-loader.service';
import { JSExecutorService, CodeEditorValidationSerivce } from './validation';

@NgModule({
  imports: [CommonModule],
  declarations: [CodeEditorComponent],
  exports: [CodeEditorComponent],
  providers: [
    MonacoLoaderService,
    JSExecutorService,
    CodeEditorValidationSerivce
  ]
})
export class CodeEditorModule {}
