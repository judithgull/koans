/* global describe, beforeEach, it, expect, inject, module */
"use strict";

describe("markerRequired", function () {
  var scope,
    form;

  beforeEach(angular.mock.module("codeEditor"));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    var element = angular.element(
      "<form name='form'>" +
      "<input name='text' ng-model='model.text' mark-required>" +
      "</form>"
    );
    scope.model = {text: null};
    $compile(element)(scope);
    form = scope.form;
  }));

  it("should be invalid for a text without marker", () => {
    form.text.$setViewValue("bla");
    scope.$digest();
    expect(form.text.$valid).toBe(false);
  });


  it("should be valid for a text with marker", () => {
    form.text.$setViewValue("aaa ??? bla");
    scope.$digest();
    expect(form.text.$valid).toBe(true);
  });


});
