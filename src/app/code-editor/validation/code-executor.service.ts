import { Injectable } from '@angular/core';

import { ErrorMarker, ProgrammingLanguage } from '../../model';
import { JSExecutorService } from './js-executor.service';
import { TsTranspilerService } from './ts-transpiler.service';

@Injectable()
export class CodeExecutorService {
  constructor(
    private jsService: JSExecutorService,
    private tsTraspiler: TsTranspilerService
  ) {}

  run(value: string, progLang: ProgrammingLanguage): ErrorMarker[] {
    if (progLang === ProgrammingLanguage.typescript) {
      const transpileRes = this.tsTraspiler.transpile(value);
      const errors = transpileRes.diagnostics.filter(d => d.category === 1);
      if (errors.length > 0) {
        return errors.map(e => {
          const message: string =
            typeof e.messageText === 'string' ? e.messageText : 'Unknown error';
          return {
            message,
            startLineNumber: 1
          };
        });
      } else {
        return this.executeTranspiledValue(transpileRes.outputText);
      }
    }
    return this.executeTranspiledValue(value);
  }

  private executeTranspiledValue(transpiledValue: string) {
    let prefix = '';
    if (transpiledValue.includes('expect')) {
      prefix = 'var chai = require("chai");var expect = chai.expect;';
    }
    const all: string = prefix + transpiledValue;
    return this.jsService.run(all);
  }
}
