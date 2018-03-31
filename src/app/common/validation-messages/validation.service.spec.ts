import { inject, TestBed } from '@angular/core/testing';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationService]
    });
  });

  it(
    'should be created',
    inject([ValidationService], (service: ValidationService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should return the default validation for unknown entries',
    inject([ValidationService], (service: ValidationService) => {
      expect(service.getMessage('', '')).toBe('Invalid value');
    })
  );

  it(
    'should return the default required message for required key',
    inject([ValidationService], (service: ValidationService) => {
      expect(service.getMessage('', 'required')).toBe('Please enter a value.');
    })
  );

  it(
    'should return the default required message for required key',
    inject([ValidationService], (service: ValidationService) => {
      expect(service.getMessage('email', 'pattern')).toBe(
        'Please enter a valid email address.'
      );
    })
  );

  it(
    'should return the default message message for parameters',
    inject([ValidationService], (service: ValidationService) => {
      expect(
        service.getMessage('unknown', 'minlength', { requiredLength: 3 })
      ).toBe('Minimum length 3');
    })
  );
});
