///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('validateEmail', function () {
  var scope
    , element;

  beforeEach(angular.mock.module('auth'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<validate-email></validate-email>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().validateEmail.name).toEqual('validateEmail');
  });

});
