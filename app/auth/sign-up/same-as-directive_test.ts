///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('sameAs', function () {
  var scope
    , form;

  beforeEach(angular.mock.module('auth.signUp'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope;
    var element = angular.element(
      '<form name="signUpForm">' +
      '<input name="password" ng-model="model.password" type="password">' +
      '<input name="passwordRepeated" ng-model="model.passwordRepeated" type="password" same-as="password">' +
      '</form>'
    );
    scope.model = {
      password: null,
      passwordRepeated: null
    };
    $compile(element)(scope);
    form = scope.signUpForm;
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

});
