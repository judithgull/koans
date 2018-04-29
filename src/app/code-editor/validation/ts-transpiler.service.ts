import { Injectable } from '@angular/core';
declare const ts: any;

@Injectable()
export class TsTranspilerService {
  static transpileOptions = { reportDiagnostics: true };

  transpile(source: string) {
    return ts.transpileModule(source, TsTranspilerService.transpileOptions);
  }

}
