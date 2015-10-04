///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('CodeEditorCtrl', function () {
  var ctrl;

  beforeEach(angular.mock.module('exercise'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('CodeEditorCtrl');
  }));


});
