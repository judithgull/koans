import * as angular from "angular";

export class EditMark {
    mark = "???";

    setAnnotations = (newMarkerAnnotations, session, errorText) => {
      const annotations = session.getAnnotations();
      if (newMarkerAnnotations.length > 0) {
        const otherCustomAnnotations = annotations.filter((a) => a["custom"]).filter((a) => a.text !== errorText);
        session.setAnnotations(newMarkerAnnotations.concat(otherCustomAnnotations));
      } else {
        session.setAnnotations(annotations.filter((a) => (a.text !== errorText)));
      }
    };

    /**
     * find edit marks in a multi-line text and return row and the column of the first occurrence of that row
     * (ignores multiple occurrences in a single row, because displaying multiple errors per row is not much help for the user)
     * */
    getEditMarks = (text:string):Position[] => {
      if (!text) {
        return [];
      }
      const lines = this.getLines(text);

      const res = [];
      lines.forEach(((l, row) => {
        const col = l.indexOf(this.mark);
        if (col >= 0) {
          res.push({
            row: row,
            column: col
          });
        }
      }));

      return res;
    };

    equals = (a1:any[], a2:any[]) => {
      if (a1.length !== a2.length) {
        return false;
      }
      const annotationEquals = (a1:any, a2:any) => {
        return a1.column === a2.column && a1.row === a2.row && a1.text === a1.text;
      };
      for (let i = 0; i < a1.length; i++) {
        if (!annotationEquals(a1[i], a2[i])) {
          return false;
        }
      }
      return true;
    };

    containsMark = (text:string):boolean => {
      if (text) {
        return text.indexOf(this.mark) > -1;
      } else {
        return false;
      }
    };

    /**
     * Only mark is allowed to change.
     * Returns true, if no other text than the mark changes
     * */
    hasOnlyMarkChanged = (origText:string, changedText:string):boolean => {
      if (!this.containsMark(origText)) {
        return true;
      }
      const splits = origText.split(this.mark);
      const rs = splits
        .map((s)=>s.trim())
        .map(this.escape)
        .join("[\\s\\S]*");

      const r = RegExp(rs);
      const matches = r.test(changedText);
      if (matches) {
        const match = r.exec(changedText);
        return match[0] === changedText;
      }
      return false;
    };

    private escape = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

    private getLines = (s) => s.split(/\r\n|\r|\n/g);

    splitVisible = (s:string):IHidable => {
      const lines = this.getLines(s);

      const hiddenIdx = this.findHiddenMarker(lines);

      const visibleLines = [];
      const hiddenLines = [];
      if (hiddenIdx >= 0) {
        for (let i = 0; i < lines.length && i < hiddenIdx; i++) {
          visibleLines.push(lines[i]);
        }

        for (let j = hiddenIdx + 1; j < lines.length; j++) {
          hiddenLines.push(lines[j]);
        }
      } else {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < lines.length; i++) {
          visibleLines.push(lines[i]);
        }
      }
      return {
        visible: visibleLines.join("\n"),
        hidden: hiddenLines.join("\n")
      };
    };

    private findHiddenMarker = (lines):number => {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].indexOf("//hidden") >= 0) {
          return i;
        }
      }
      return -1;
    }


  }

export class CustomAnnotation {
    public type = "error";
    public custom = true;

    constructor(public row:number,
                public column:number,
                public text:string) {
    }
  }

export interface IHidable {
    visible:string;
    hidden: string;
  }

export interface Position {
    row:number,
    column:number
  }


