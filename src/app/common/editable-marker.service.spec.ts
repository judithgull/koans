import { TestBed, inject } from '@angular/core/testing';

import { EditableMarkerService } from './editable-marker.service';

describe('EditableMarkerService', () => {
  let svc: EditableMarkerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditableMarkerService]
    });
  });

  beforeEach(inject([EditableMarkerService], (service: EditableMarkerService) => {
    svc = service;
  }));

  describe('contains', () => {

    it('empty text should not contain a mark', () => {
      expect(svc.containsMarker('')).toBe(false);
    });

    it('text with mark should contain a mark', () => {
      expect(svc.containsMarker(svc.mark)).toBe(true);
    });

    it('null text should not contain a mark', () => {
      expect(svc.containsMarker(null)).toBe(false);
    });

  });

  describe('getEditableMarkers', () => {

    it('should return an empty array for an empty, null or undefined text', () => {
      expect(svc.getEditMarkers(undefined)).toEqual([]);
      expect(svc.getEditMarkers(null)).toEqual([]);
      expect(svc.getEditMarkers('')).toEqual([]);
    });

    it('should find a mark on a single line', () => {
      expect(svc.getEditMarkers('???')).toEqual([{ row: 0, col: 0 }]);
      expect(svc.getEditMarkers('aa???')).toEqual([{ row: 0, col: 2 }]);
      expect(svc.getEditMarkers('aa???aa')).toEqual([{ row: 0, col: 2 }]);
      expect(svc.getEditMarkers('aa???aa???')).toEqual([{ row: 0, col: 2 }]);
    });

    it('should not return a result, if no edit mark is found', () => {
      expect(svc.getEditMarkers('a')).toEqual([]);
    });

    it('should return one occurrence per line for multiple lines', () => {
      expect(svc.getEditMarkers('\n???')).toEqual([{ row: 1, col: 0 }]);
    });

  });


});
