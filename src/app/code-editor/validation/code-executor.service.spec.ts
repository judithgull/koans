import { TestBed } from '@angular/core/testing';
import { CodeExecutorService } from './code-executor.service';
import { FeedbackFactory, SourceType } from '../../common/model';
import { JSExecutorService } from './js-executor.service';

describe('CodeExecutorService', () => {
  let service: CodeExecutorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeExecutorService, JSExecutorService]
    });
    service = TestBed.get(CodeExecutorService);
  });
  it('should run a valid js value', () => {
    expect(service.run('')).toEqual(
      FeedbackFactory.createSuccess(SourceType.Runner, '')
    );
  });

  it('should run an invalid js value', () => {
    const error = 'error';
    const value = `throw "${error}";`;
    expect(service.run(value)).toEqual(
      FeedbackFactory.createError(SourceType.Runner, error, value)
    );
  });
});
