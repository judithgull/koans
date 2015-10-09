///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('EditTopicCtrl', function () {
  var ctrl;

  beforeEach(angular.mock.module('editTopic'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('EditTopicCtrl');
  }));

  it('should have ctrlName as EditTopicCtrl', function () {
    expect(ctrl.ctrlName).toEqual('EditTopicCtrl');
  });

});
