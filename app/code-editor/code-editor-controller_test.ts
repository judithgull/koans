import {} from "jasmine";
import * as angular from "angular";
import "angular-mocks";
import {ICodeEditorModel} from "./code-editor-controller";
import {ICodeEditorScope} from "./code-editor-directive";

declare var ace: any;

module codeEditor {
  "use strict";

  describe("Code Editor Controller", function() {
    var ctrl:ICodeEditorModel;
    var scope:ICodeEditorScope;
    var testEditor:any;

    const createTestEditor = () => {
      const doc = angular.element(document);
      doc.find("body").append("<div  id='#test'></div>");
      const e = doc.find("#test");
      testEditor = ace.edit(e.get(0));
    };

    beforeEach(angular.mock.module("codeEditor"));

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      scope.libsLoader = () => () => [];
      ctrl = $controller("CodeEditorCtrl", {$scope: scope});
      createTestEditor();
    }));

  });

}
