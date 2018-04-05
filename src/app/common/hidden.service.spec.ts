import { TestBed, inject } from '@angular/core/testing';

import { HiddenService } from './hidden.service';

describe('HiddenService', () => {
  let svc: HiddenService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HiddenService]
    });
  });

  beforeEach(
    inject([HiddenService], (service: HiddenService) => {
      svc = service;
    })
  );

  it('should be created', inject([HiddenService], (service: HiddenService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an empty string for an empty, null or undefined text', () => {
    expect(svc.getVisibleText(undefined)).toEqual('');
    expect(svc.getVisibleText(null)).toEqual('');
    expect(svc.getVisibleText('')).toEqual('');
  });

  it('should remove the text starting from "\n//hidden"', () => {
    expect(svc.getVisibleText('xy\n//hidden\nxz')).toEqual('xy');
    expect(svc.getVisibleText('\n//hidden\nxyz')).toEqual('');
    expect(svc.getVisibleText('//hidden\nxyz')).toEqual('//hidden\nxyz');
  });

  it('should return the whole text, if "\n//hidden" is not present', () => {
    expect(svc.getVisibleText('xy\nasdf')).toEqual('xy\nasdf');
  });
});
