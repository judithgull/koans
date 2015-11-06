///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('SignUpCtrl', function () {
  var ctrl;

  beforeEach(angular.mock.module('auth.signUp'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('SignUpCtrl');
  }));

  it('should have ctrlName as SignUpCtrl', function () {
    expect(ctrl.ctrlName).toEqual('SignUpCtrl');
  });

});
