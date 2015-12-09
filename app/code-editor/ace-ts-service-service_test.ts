/* global describe, beforeEach, it, expect, inject, module */
module codeEditor {
  'use strict';

  describe('AceTsService', function () {
    var service:ts.IAceTsService;

    beforeEach(angular.mock.module('koans'));

    beforeEach(inject(function (AceTsService) {
      service = AceTsService;
    }));

  });

}
