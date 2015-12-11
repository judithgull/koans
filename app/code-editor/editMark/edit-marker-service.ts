module codeEditor {
  'use strict';

  export class EditMarker {
    mark = "???";

    getEditRanges = (editor:AceAjax.Editor) => {
      var options = {
        backwards: false,
        wrap: true,
        caseSensitive: false,
        wholeWord: false,
        regExp: false
      };

      var range = editor.find(this.mark, options);
      var ranges = [];
      while (range) {
        ranges.push(range);
        range = editor.findNext(options);
      }
      return ranges;

    };

    equals = (a1:AceAjax.Annotation[], a2:AceAjax.Annotation[]) => {
      if (a1.length !== a2.length) {
        return false;
      }
      var annotationEquals = (a1:AceAjax.Annotation, a2:AceAjax.Annotation) => {
        return a1.column === a2.column && a1.row === a2.row && a1.text === a1.text;
      };
      for(let i=0;i<a1.length;i++){
        if(!annotationEquals(a1[i], a2[i])){
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

    /*
     * Only mark is allowed to change.
     * Returns true, if no other text than the mark changes
     * */
    hasOnlyMarkChanged = (origText:string, changedText:string):boolean => {
      if (!this.containsMark(origText)) {
        return true;
      }
      var splits = origText.split(this.mark);
      var rs = splits
        .map(this.escape)
        .join('[\\s\\S]+');

      var r = RegExp(rs);
      var matches = r.test(changedText);
      if (matches) {
        var match = r.exec(changedText);
        return match[0] === changedText;
      }
      return false;
    };

    private escape = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  export class NoMarkAnnotation implements AceAjax.Annotation{
    public type = 'error';
    public id = 'NoMark';

    constructor(public row: number,
                public column: number,
                public text = 'Please replace ??? with the correct answer!'
    ){}
  }

  /**
   * @ngdoc service
   * @name codeEditor.service:EditMarker
   *
   * @description
   *
   */
  angular
    .module('codeEditor')
    .service('EditMarker', EditMarker);
}
