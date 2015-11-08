///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('HeaderCtrl', function () {
  var $ctrl;

  beforeEach(angular.mock.module('header'));

  beforeEach(inject(function ($rootScope, $controller) {
    $ctrl = $controller;
  }));

  it('should inititially not be logged in', () => {
    var authService = {
      isLoggedIn: () => false
    };
    var ctrl = $ctrl('HeaderCtrl', {AuthService: authService});
    expect(ctrl.isLoggedIn).toBe(false);
  });

  it('should be logged in, if user is logged in', () => {
    var authService = {
      isLoggedIn: () => true
    };
    var ctrl = $ctrl('HeaderCtrl', {AuthService: authService});
    expect(ctrl.isLoggedIn).toBe(true);
  });


});
