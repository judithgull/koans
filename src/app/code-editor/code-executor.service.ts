import { Injectable } from '@angular/core';
import { Feedback, FeedbackFactory } from '../common/model/feedback';

@Injectable()
export class CodeExecutorService {
  /**
   * Run without showing specific error.
   */
  run(source: string): Feedback {
    try {
      // tslint:disable-next-line:no-eval
      eval(source);
      return FeedbackFactory.createSuccess('run');
    } catch (e) {
      const message = 'Runtime Error: Incorrect implementation';
      return FeedbackFactory.createError(message, 'run');
    }
  }
}
