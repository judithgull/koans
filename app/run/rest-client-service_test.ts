///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('RestClient', function () {
  var service;

  beforeEach(module('run'));

  beforeEach(inject(function (RestClient) {
    service = RestClient;
  }));

  it('should equal RestClient', function () {
    expect(service.get()).toEqual('RestClient');
  });

});
