import { Injectable } from '@angular/core';
import { Feedback, FeedbackFactory } from '../../common/model';
import { JSExecutorService } from '.';

@Injectable()
export class CodeExecutorService {
  constructor(private jsService: JSExecutorService) {}
  run(value: string): Feedback {
    return this.jsService.run(value);
  }
}
