import { Injectable } from '@angular/core';
import {
  Feedback,
  FeedbackFactory,
  ProgrammingLanguage
} from '../../common/model';
import { JSExecutorService } from './js-executor.service';
import { TsTranspilerService } from './ts-transpiler.service';

@Injectable()
export class CodeExecutorService {
  constructor(
    private jsService: JSExecutorService,
    private tsTraspiler: TsTranspilerService
  ) {}

  run(value: string, progLang: ProgrammingLanguage): Feedback {
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
