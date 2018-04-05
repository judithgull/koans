import { Injectable } from '@angular/core';

@Injectable()
export class HiddenService {

  /**
   * Return input without hidden lines at the end
   * */
  getVisibleText(text: string): string {
    if (!text) {
      return '';
    }
    const n = text.indexOf('\n//hidden');
    if (n >= 0) {
      return text.substring(0, n);
    }
    return text;
  }
}
