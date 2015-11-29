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
    }
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
