import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CodeEditorComponent } from './code-editor.component';
import { MonacoLoaderService } from './monaco-loader.service';
import { CodeExecutorService } from './code-executor.service';

@NgModule({
  imports: [CommonModule],
  declarations: [CodeEditorComponent],
  exports: [CodeEditorComponent],
  providers: [MonacoLoaderService, CodeExecutorService]
})
export class CodeEditorModule {}
