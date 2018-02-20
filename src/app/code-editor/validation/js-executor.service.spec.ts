import { TestBed, inject } from '@angular/core/testing';

import { JSExecutorService } from './js-executor.service';
import { FeedbackType } from '../../common/model';

describe('CodeExecutorService', () => {
  let service: JSExecutorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JSExecutorService]
    });
    service = TestBed.get(JSExecutorService);
  });

  it('should be created', () => {
    const res = service.run('');
    expect(res.type).toBe(FeedbackType.Success);
  });

  it('should return an error for a script that throws an error', () => {
    const res = service.run('throw "blubbi"');
    expect(res.type).toBe(FeedbackType.Error);
  });
});
