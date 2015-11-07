///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Auth', function () {
  var service;

  beforeEach(angular.mock.module('auth'));

  beforeEach(inject(function (AuthService) {
    service = AuthService;
  }));

  it('should equal Auth', function () {
    expect(service.get()).toEqual('Auth');
  });

});
