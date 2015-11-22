
/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('account', function () {
  var scope
    , element;

  beforeEach(angular.mock.module('auth'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<account></account>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().account.name).toEqual('account');
  });

});
