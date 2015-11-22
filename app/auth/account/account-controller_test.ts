///<reference path='../../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('AccountCtrl', function () {
  var ctrl;

  beforeEach(angular.mock.module('auth.account'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('AccountCtrl');
  }));

  it('should have ctrlName as AccountCtrl', function () {
    expect(ctrl.ctrlName).toEqual('AccountCtrl');
  });

});
