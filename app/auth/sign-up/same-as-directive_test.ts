///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('sameAs', function () {
  var scope
    , element;

  beforeEach(angular.mock.module('auth.signUp'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<same-as></same-as>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().sameAs.name).toEqual('sameAs');
  });

});
