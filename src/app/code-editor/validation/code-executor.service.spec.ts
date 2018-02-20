import { TestBed } from '@angular/core/testing';
import { CodeExecutorService } from './code-executor.service';
import {
  FeedbackFactory,
  SourceType,
  ProgrammingLanguage,
  FeedbackType
} from '../../common/model';
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
  });
  it('should run a valid js value', () => {
    expect(service.run('', ProgrammingLanguage.javascript)).toEqual(
      FeedbackFactory.createSuccess(SourceType.Runner, '')
    );
  });

  it('should run an invalid js value', () => {
    const error = 'error';
    const value = `throw "${error}";`;
    expect(service.run(value, ProgrammingLanguage.javascript)).toEqual(
      FeedbackFactory.createError(SourceType.Runner, error, value)
    );
  });

  it('should run a valid ts value', () => {
    const value = 'const a:number = 1;';
    const transpiledValue = 'var a = 1;';
    spyOn(transpilerService, 'run').and.returnValue(transpiledValue);
    const res = service.run(value, ProgrammingLanguage.typescript);
    expect(res.value).toEqual(transpiledValue);
    expect(res.type).toEqual(FeedbackType.Info);
  });
});
