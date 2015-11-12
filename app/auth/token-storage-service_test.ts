module auth.token {
  /* global describe, beforeEach, it, expect, inject, module */
  'use strict';

  describe('TokenStorage', () => {
    var service:TokenStorage;
    var testToken = 'blubbr';

    beforeEach(angular.mock.module('auth'));

    beforeEach(inject((TokenStorage) => {
      service = TokenStorage;
    }));

    afterEach(()=>{
      service.clear();
    });

    it('should initially not get a token', () => {
      expect(service.get()).toBe(null);
    });

    it('should get a token, after setting one', () => {
      service.set(testToken);
      expect(service.get()).toBe(testToken);
    });

    it('should not get a token, after clear', () => {
      service.set(testToken);
      service.clear();
      expect(service.get()).toBe(null);
    });

  });
}
