///<reference path='../../typings/tsd.d.ts' />
module codeEditor {
  'use strict';

  export class EditMarker {
    mark = "???";

    containsMark = (text:string):boolean => {
      if(text){
        return text.indexOf(this.mark) > -1;
      }else {
        return false;
      }
    };

    /*
    * Only mark is allowed to change.
    * Returns true, if no other text than the mark changes
    * */
    hasOnlyMarkChanged = (origText:string, changedText:string) => {
      var splitedOrigText = origText.split(this.mark);
      var changedTextbefore = changedText.substring(0, splitedOrigText[0].length);

      if(changedTextbefore !==  splitedOrigText[0]) {
        return false;
      }else {
        var startAfterIndex = changedText.indexOf(splitedOrigText[1]);
        if(startAfterIndex < 0){
          return false;
        }
        var changedTextafter = changedText.substring(startAfterIndex, startAfterIndex + splitedOrigText[1].length);
        return changedTextafter === splitedOrigText[1];
      }
    };
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
