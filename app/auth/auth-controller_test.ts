///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('AuthCtrl', function () {
  var ctrl;

  beforeEach(angular.mock.module('auth'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('AuthCtrl');
  }));

  it('should have ctrlName as AuthCtrl', function () {
    expect(ctrl.ctrlName).toEqual('AuthCtrl');
  });

});
