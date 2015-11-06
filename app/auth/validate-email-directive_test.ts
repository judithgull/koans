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
        '<input name="text" ng-model="model.text" type="email" validate-email>' +
        '</form>'
      );
      scope.model = {text: null};
      $compile(element)(scope);
      form = scope.form;
    }));

    describe('invalid e-mails', () => {
      it('should be invalid for invalid e-mail', () => {
        form.text.$setViewValue('invalid e-mail');
        scope.$digest();
        expect(form.text.$valid).toBe(false);
      });

      it('should be invalid for test@gmx', () => {
        form.text.$setViewValue('test@gmx');
        scope.$digest();
        expect(form.text.$valid).toBe(false);
      });
    });

    it('should be valid for empty string', () => {
      form.text.$setViewValue('');
      scope.$digest();
      expect(form.text.$valid).toBe(true);
    });

    it('should be valid for test@gmx.ch', () => {
      form.text.$setViewValue('test@gmx.ch');
      scope.$digest();
      expect(form.text.$valid).toBe(true);
    });


  });

}
