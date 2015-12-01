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

    describe('Has only mark changed', () => {

      it('it should return true, if nothing has changed', () => {
        expect(service.hasOnlyMarkChanged("???", "???")).toBe(true);
      });

      it('it should return true when mark changed', () => {
       expect(service.hasOnlyMarkChanged("???", "??")).toBe(true);
       expect(service.hasOnlyMarkChanged("code ???", "code ??")).toBe(true);
       expect(service.hasOnlyMarkChanged("code ??? aaa", "code ?? aaa")).toBe(true);
      });

      it('it should return false when original text changed', () => {
        expect(service.hasOnlyMarkChanged("code ???", "codxe ??")).toBe(false);
        expect(service.hasOnlyMarkChanged("code ??? code", "codxe ??? code")).toBe(false);
        expect(service.hasOnlyMarkChanged("code ??? code", "code ??? codxe")).toBe(false);
        expect(service.hasOnlyMarkChanged("code ??? code", "code ??")).toBe(false);
        expect(service.hasOnlyMarkChanged("code ??? code", "code ?? code xxx")).toBe(false);
      });


      it('it should return true for multiple marks when only marks have changed', () => {
        expect(service.hasOnlyMarkChanged("??? a ???", ". a xx")).toBe(true);
      });


      it('it should return false when original text changed for multiple marks', () => {
        expect(service.hasOnlyMarkChanged("a ??? a ???", "a b")).toBe(false);
      });

    });
  });

}
