///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('codeEditor', function () {
  var scope
    , element;

  beforeEach(angular.mock.module('exercise'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<code-editor></code-editor>'))(scope);
  }));

/*  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().codeEditor.name).toEqual('codeEditor');
  });
  */

});
