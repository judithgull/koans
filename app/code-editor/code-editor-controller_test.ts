///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Code Editor Controller', function () {
  var ctrl;

  beforeEach(angular.mock.module('codeEditor'));

  beforeEach(inject(function ($rootScope, $controller) {
    var scope = $rootScope.$new();
    ctrl = $controller('CodeEditorCtrl', {$scope:scope});
  }));

  it("should be defined", function(){
    expect(ctrl).toBeDefined();
  });

});
