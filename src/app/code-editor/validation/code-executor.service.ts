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
    return this.jsService.run(this.getTranspiledValue(value, progLang));
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
