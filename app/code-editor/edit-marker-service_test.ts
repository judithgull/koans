///<reference path='../../typings/tsd.d.ts' />

/* global describe, beforeEach, it, expect, inject, module */
module codeEditor {
  'use strict';

  describe('EditMarker', function () {
    var service:EditMarker;

    beforeEach(angular.mock.module('codeEditor'));

    beforeEach(inject(function (EditMarker) {
      service = EditMarker;
    }));

    it('empty text should not contain a mark', () => {
      expect(service.containsMark('')).toBe(false);
    });

    it('text with mark should contain a mark', () => {
      expect(service.containsMark(service.mark)).toBe(true);
    });

    it('null text should not contain a mark', () => {
      expect(service.containsMark(null)).toBe(false);
    });

  });

}
