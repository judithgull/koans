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

    describe('Has only mark changed', function () {

      it('it should return true, if nothing has changed', () => {
        expect(service.hasOnlyMarkChanged("???", "???")).toBe(true);
      });

      it('it should return true when only mark has changed', () => {
        expect(service.hasOnlyMarkChanged("???", "??")).toBe(true);
      });

      it('it should return true when mark changed', () => {
        expect(service.hasOnlyMarkChanged("code ???", "code ??")).toBe(true);
      });

      it('it should return false when original text changed', () => {
        expect(service.hasOnlyMarkChanged("code ???", "codxe ??")).toBe(false);
      });

    });
  });

}
