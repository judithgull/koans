import { Injectable } from '@angular/core';
declare const ts: any;

@Injectable()
export class TsTranspilerService {
  run(source: string): string {
    const options = {};
    const res = ts.transpileModule(source, options);
    return res.outputText;
  }
}
