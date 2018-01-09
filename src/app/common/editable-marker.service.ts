import { Injectable } from '@angular/core';

/**
 * Service to find and compare the editable marker in a text
*/
@Injectable()
export class EditableMarkerService {

  mark = '???';

  /**
   * Find lines containing one or more editable markers
   * */
  getEditMarkers(text: string): { row: number, col: number }[] {
    if (!text) {
      return [];
    }
    const lines: string[] = this.getLines(text);

    const res: { row: number, col: number }[] = [];
    lines.forEach(((l, row) => {
      const col = l.indexOf(this.mark);
      if (col >= 0) {
        res.push({
          row: row,
          col: col
        });
      }
    }));

    return res;
  }

  containsMarker(text: string): boolean {
    if (text) {
      return text.indexOf(this.mark) > -1;
    } else {
      return false;
    }
  }

  private getLines(s: string): string[] {
    return s.split(/\r\n|\r|\n/g);
  }

}
