///<reference path='../../../typings/tsd.d.ts' />
module auth.signUp {
  /* global describe, beforeEach, it, expect, inject, module */
  'use strict';

  describe('sameAs', function () {
    var scope:ng.IScope, form;

    beforeEach(angular.mock.module('auth.signUp'));

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope;
      var element = angular.element(
        '<form name="form">' +
        '<input name="password" ng-model="model.password" type="password">' +
        '<input name="passwordRepeated" ng-model="model.passwordRepeated" type="password" same-as="model.password">' +
        '</form>'
      );
      scope['model'] = {
        password: null,
        passwordRepeated: null
      };
      $compile(element)(scope);
      form = scope['form'];
    }));

    it('should be invalid for two different inputs', ()  => {
      form.password.$setViewValue('pw1');
      form.passwordRepeated.$setViewValue('pw2');
      scope.$digest();
      expect(form.passwordRepeated.$valid).toBe(false);
    });

    it('should be valid for the same inputs', ()  => {
      form.password.$setViewValue('pw1');
      form.passwordRepeated.$setViewValue('pw1');
      scope.$digest();
      expect(form.passwordRepeated.$valid).toBe(true);
    });

    it('should be invalid when changing first value', ()  => {
      form.password.$setViewValue('pw1');
      form.passwordRepeated.$setViewValue('pw1');
      scope.$digest();
      form.password.$setViewValue('pw2');
      scope.$digest();
      expect(form.passwordRepeated.$valid).toBe(false);
    });

    it('should be valid when changing first value', ()  => {
      form.password.$setViewValue('pw2');
      form.passwordRepeated.$setViewValue('pw1');
      scope.$digest();
      form.password.$setViewValue('pw1');
      scope.$digest();
      expect(form.passwordRepeated.$valid).toBe(true);
    });

  });
}
