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
    const transpiledValue = this.getTranspiledValue(value, progLang);
    const prefix = 'var expect = chai.expect;';
    const all: string = prefix + transpiledValue;
    return this.jsService.run(all);
  }

  private getTranspiledValue(
    value: string,
    progLang: ProgrammingLanguage
  ): string {
    if (progLang === ProgrammingLanguage.typescript) {
      return this.tsTraspiler.run(value);
    }
    return value;
  }
}
