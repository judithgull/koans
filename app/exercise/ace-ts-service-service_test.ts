/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('AceTsService', function () {
  var service:AceTsService.IAceTsService;
  var $httpBackend;
  var tsLibName = "typescripts/lib.d.ts";

  beforeEach(angular.mock.module('koans'));

  beforeEach(inject(function (AceTsService) {
    service = AceTsService;
  }));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get("$httpBackend");
    $httpBackend.when("GET", tsLibName).respond("lib");
  }));

 /* it('should return an ace initializer', () => {
    $httpBackend.expectGET(tsLibName);
    var init = service.getAceInitializer(["typescripts/lib.d.ts"]);
    init.then(
        f => f(ace.edit("testEl"))
    );
    $httpBackend.flush();
  });
*/
});
