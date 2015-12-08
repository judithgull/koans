module codeEditor.ts {
  'use strict';

  export interface IAceTsService {
    /**
     * Add libraries to ace editor
     * */
    addLibs(editor:AceAjax.Editor, libs:Array<Data.ILibrary>)
  }

  class AceTsService implements IAceTsService {

    addLibs(editor:AceAjax.Editor, libs:Array<Data.ILibrary>) {
      libs.forEach(
        lib => {
          (<any>editor.getSession()).$worker.emit('addLibrary', {data: lib});
        }
      );
    }


  }

  /**
   * @ngdoc service
   * @name koans.service:AceTsService
   *
   * @description
   *
   */
  angular
    .module('codeEditor')
    .service('AceTsService', AceTsService);
}
