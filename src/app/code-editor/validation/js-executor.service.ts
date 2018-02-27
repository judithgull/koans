import { Injectable } from '@angular/core';
import { ErrorMarker } from '../../common/model';
/**
 * TODO: do it nicely with web workers and timeouts
 * Execute js code
 * */
@Injectable()
export class JSExecutorService {
  runtimeErrorMessage = 'Runtime Error: Incorrect implementation';
  /**
   * Run without showing specific error.
   */
  run(source: string): ErrorMarker[] {
    try {
      // tslint:disable-next-line:no-eval
      eval(source);
      return [];
    } catch (e) {
      return [{ message: this.runtimeErrorMessage, startLineNumber: 1 }];
    }
  }
}
