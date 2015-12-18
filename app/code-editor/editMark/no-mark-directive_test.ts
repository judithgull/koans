/* global describe, beforeEach, it, expect, inject, module */
"use strict";

describe("noMark", function () {
  var scope
    , form;


  beforeEach(angular.mock.module("codeEditor"));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    var element = angular.element(
      "<form name='form'>" +
      "<code-editor " +
      " language='model.lang' " +
      " name='text2'" +
      " ng-model='model.exercise'" +
      " no-mark>" +
      "</code-editor>" +
      "<input name='text' ng-model='model.text'>" +
      "<form>"
    );
    scope.model = {
      lang: "typescript",
      exercise: null,
      text: null
    };
    $compile(element)(scope);
    form = scope.form;
  }));

  /*
   it("should be invalid for a text without marker", () => {
   console.log(form);
   form.exercise.$setViewValue("bla");
   scope.$digest();
   expect(form.exercise.$valid).toBe(true);
   });


   it("should be valid for a text with marker", () => {
   form.exercise.$setViewValue("aaa ??? bla");
   scope.$digest();
   expect(form.exercise.$valid).toBe(false);
   });
   */

});
