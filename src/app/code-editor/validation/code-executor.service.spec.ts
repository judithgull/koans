import { TestBed } from '@angular/core/testing';

import { ProgrammingLanguage } from '../../model';
import { CodeExecutorService } from './code-executor.service';
import { JSExecutorService } from './js-executor.service';
import { TsTranspilerService } from './ts-transpiler.service';
import { MonacoLoaderService } from '../monaco-loader.service';
import * as ts from 'typescript';

class MockTsTranspilerService {
  transpile(source: string): ts.TranspileOutput {
    return ts.transpileModule(source, TsTranspilerService.transpileOptions);
  }
}

describe('CodeExecutorService', () => {
  let service: CodeExecutorService;
  let jsService: JSExecutorService;

  beforeEach(done => {
    TestBed.configureTestingModule({
      providers: [
        MonacoLoaderService,
        CodeExecutorService,
        JSExecutorService,
        { provide: TsTranspilerService, useClass: MockTsTranspilerService }
      ]
    });
    service = TestBed.get(CodeExecutorService);
    jsService = TestBed.get(JSExecutorService);

    const monacoLoader = TestBed.get(MonacoLoaderService);
    monacoLoader.isMonacoLoaded.subscribe(loaded => {
      if (loaded) {
        done();
      }
    });

  });

  describe('js', () => {
    it('should run a valid js value', () => {
      expect(service.run('', ProgrammingLanguage.javascript)).toEqual([]);
    });


    it('should error on an invalid js value', () => {
      const error = 'error';
      const value = `throw "${error}";`;
      const res = service.run(value, ProgrammingLanguage.javascript)
      expect(res).toEqual([
        {
          message: jsService.runtimeErrorMessage,
          startLineNumber: 1
        }
      ]);
    });
  });

  describe('ts', () => {

    it('? should fail', () => {
      const res = service.run('?', ProgrammingLanguage.typescript);
      expect(res.length).toBe(1);
      expect(res[0].message).toBe('Declaration or statement expected.');
    });

    it('valid ts code should not fail', () => {
      const res = service.run('const a: number = 1', ProgrammingLanguage.typescript);
      expect(res).toEqual([]);
    });

    it('should run valid assertion', () => {
      const value = `function add(x:number, y:number){
                        return x + y;
                    }
                  expect(add(2,3)).to.equal(5);`;
      const res = service.run(value, ProgrammingLanguage.typescript);
      expect(res).toEqual([]);
    });

    it('should fail for invalid assertion', () => {
      const value = `function add(x:number, y:number){
                        return x + y;
                    }
                  expect(add(2,3)).to.equal(4);`;
      const res = service.run(value, ProgrammingLanguage.typescript);
      expect(res).toEqual([{ message: 'expected 5 to equal 4', startLineNumber: 1 }]);
    });
  });

});




