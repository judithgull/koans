import { TestBed } from '@angular/core/testing';

import { ProgrammingLanguage } from '../../model';
import { CodeExecutorService } from './code-executor.service';
import { JSExecutorService } from './js-executor.service';
import { TsTranspilerService } from './ts-transpiler.service';

class MockTsTranspilerService {
  run(v: string) {
    return v;
  }
}

describe('CodeExecutorService', () => {
  let service: CodeExecutorService;
  let transpilerService: TsTranspilerService;
  let jsService: JSExecutorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CodeExecutorService,
        JSExecutorService,
        { provide: TsTranspilerService, useClass: MockTsTranspilerService }
      ]
    });
    service = TestBed.get(CodeExecutorService);
    transpilerService = TestBed.get(TsTranspilerService);
    jsService = TestBed.get(JSExecutorService);
  });
  it('should run a valid js value', () => {
    expect(service.run('', ProgrammingLanguage.javascript, [])).toEqual([]);
  });

  it('should run an invalid js value', () => {
    const error = 'error';
    const value = `throw "${error}";`;
    expect(service.run(value, ProgrammingLanguage.javascript, [])).toEqual([
      {
        message: jsService.runtimeErrorMessage,
        startLineNumber: 1
      }
    ]);
  });

  it('should run a valid ts value', () => {
    const value = 'const a:number = 1;';
    const transpiledValue = 'var a = 1;';
    spyOn(transpilerService, 'run').and.returnValue(transpiledValue);
    const res = service.run(value, ProgrammingLanguage.typescript, []);
    console.log(res);
    expect(res).toEqual([]);
  });
});
