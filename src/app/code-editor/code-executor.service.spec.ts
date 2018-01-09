import { TestBed, inject } from '@angular/core/testing';

import { CodeExecutorService } from './code-executor.service';
import { FeedbackType } from '../common/model/feedback';

describe('CodeExecutorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeExecutorService]
    });
  });

  it(
    'should be created',
    inject([CodeExecutorService], (service: CodeExecutorService) => {
      const res = service.run('');
      expect(res.type).toBe(FeedbackType.Info);
    })
  );

  it(
    'should return an error for a script that throws an error',
    inject([CodeExecutorService], (service: CodeExecutorService) => {
      const res = service.run('throw "blubbi"');
      expect(res.type).toBe(FeedbackType.Error);
      expect(res.message).toContain('Runtime Error');
    })
  );
});
