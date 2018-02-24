import { Injectable } from '@angular/core';
import {
  Feedback2,
  FeedbackFactory,
  SourceType,
  Feedback
} from '../../common/model';
/**
 * TODO: do it nicely with web workers and timeouts
 * Execute js code
 * */
@Injectable()
export class JSExecutorService {
  /**
   * Run without showing specific error.
   */
  run(source: string): Feedback2 {
    try {
      // tslint:disable-next-line:no-eval
      eval(source);
      return FeedbackFactory.createSuccess(SourceType.Runner, source);
    } catch (e) {
      const message = 'Runtime Error: Incorrect implementation';
      return FeedbackFactory.createError(SourceType.Runner, e, source);
    }
  }
}
