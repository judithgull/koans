///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('EditTopicCtrl', function () {
  var ctrl;

  beforeEach(angular.mock.module('editTopic'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('EditTopicCtrl');
  }));

  it('should have typescript as initial language', function () {
    expect(ctrl.language).toEqual('typescript');
  });

});
