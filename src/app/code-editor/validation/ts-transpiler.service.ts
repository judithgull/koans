import { Injectable } from '@angular/core';
import * as ts from 'typescript';

@Injectable()
export class TsTranspilerService {
  static transpileOptions = { reportDiagnostics: true };

  transpile(source: string) {
    return ts.transpileModule(source, TsTranspilerService.transpileOptions);
  }
}
