///<reference path='../../typings/tsd.d.ts' />
module auth {
  /* global describe, beforeEach, it, expect, inject, module */
  'use strict';

  describe('validateEmail', function () {
    var scope, form;

    beforeEach(angular.mock.module('auth'));

    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope;
      var element = angular.element(
        '<form name="form">' +
        '<input name="text" ng-model="model.text" validate-email />' +
        '</form>'
      );
      scope.model = {text: null};
      $compile(element)(scope);
      form = scope.form;
    }));

    it('should have correct text', function () {
      form.text.$setViewValue('dg');
      scope.$digest();
      expect(scope.model.text).toEqual('dg');
      expect(form.text.$valid).toBe(false);
    });

  });

}
