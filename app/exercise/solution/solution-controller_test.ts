/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('SolutionCtrl', function () {
  var ctrl;

  beforeEach(module('exercise.solution'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('SolutionCtrl');
  }));

  it('should have ctrlName as SolutionCtrl', function () {
    expect(ctrl.ctrlName).toEqual('SolutionCtrl');
  });

});
