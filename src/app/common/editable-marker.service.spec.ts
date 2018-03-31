import { inject, TestBed } from '@angular/core/testing';

import { EditableMarkerService } from './editable-marker.service';

describe('EditableMarkerService', () => {
  let svc: EditableMarkerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditableMarkerService]
    });
  });

  beforeEach(
    inject([EditableMarkerService], (service: EditableMarkerService) => {
      svc = service;
    })
  );

  describe('getEditableMarkers', () => {
    it('should return an empty array for an empty, null or undefined text', () => {
      expect(svc.getPlaceholders(undefined)).toEqual([]);
      expect(svc.getPlaceholders(null)).toEqual([]);
      expect(svc.getPlaceholders('')).toEqual([]);
    });

    it('should find a mark on a single line', () => {
      expect(svc.getPlaceholders('???')).toEqual([{ row: 0, col: 0 }]);
      expect(svc.getPlaceholders('aa???')).toEqual([{ row: 0, col: 2 }]);
      expect(svc.getPlaceholders('aa???aa')).toEqual([{ row: 0, col: 2 }]);
      expect(svc.getPlaceholders('aa???aa???')).toEqual([{ row: 0, col: 2 }]);
    });

    it('should not return a result, if no edit mark is found', () => {
      expect(svc.getPlaceholders('a')).toEqual([]);
    });

    it('should return one occurrence per line for multiple lines', () => {
      expect(svc.getPlaceholders('\n???')).toEqual([{ row: 1, col: 0 }]);
    });
  });
});
