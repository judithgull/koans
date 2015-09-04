///<reference path='../../typings/tsd.d.ts' />

/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('RunCtrl', function () {
  var ctrl;

  beforeEach(module('run'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('RunCtrl');
  }));

  it('should have ctrlName as RunCtrl', function () {
//    expect(ctrl.ctrlName).toEqual('RunCtrl');
  });

});
