import { Injectable } from '@angular/core';

/**
 * Service to find and compare the editable marker in a text
 */
@Injectable()
export class EditableMarkerService {
  placeholder = '???';

  /**
   * Find lines containing one or more placeholders
   * */
  getPlaceholders(text: string): Array<{ row: number; col: number }> {
    if (!text) {
      return [];
    }
    const lines: string[] = this.getLines(text);

    const res: Array<{ row: number; col: number }> = [];
    lines.forEach((l, row) => {
      const col = l.indexOf(this.placeholder);
      if (col >= 0) {
        res.push({
          row: row,
          col: col
        });
      }
    });

    return res;
  }

  private getLines(s: string): string[] {
    return s.split(/\r\n|\r|\n/g);
  }
}
