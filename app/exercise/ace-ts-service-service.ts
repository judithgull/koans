module AceTsService {
  'use strict';

  export interface IAceTsService{
    /**
     * Initialize ace with necessary libraries
     * */
    getAceInitializer(libNames:string[]): ng.IPromise<Function>;
  }



  class AceTsService implements IAceTsService{

    public static $inject = ['RestClient'];

    constructor(
      private restClient:RestClient.IRestClient
    ) {}

    getAceInitializer(libNames:string[]): ng.IPromise<Function>{
      return this.restClient
        .getLibs(libNames)
        .then(libs => this.init(libs))
    }

    private init(libs:Array<Data.ILibrary>):Function{
      return (editor: AceAjax.Editor) => {
        this.addLib(editor, libs);
      };
    }

    private addLib(editor:AceAjax.Editor, libs: Array<Data.ILibrary>){
      libs.forEach(
          lib => (<any>editor.getSession()).$worker.emit("addLibrary", { data: lib})
      );
    }


  }

  /**
   * @ngdoc service
   * @name koans.service:AceTsServiceTs
   *
   * @description
   *
   */
  angular
    .module('exercise')
    .service('AceTsService', AceTsService);
}
