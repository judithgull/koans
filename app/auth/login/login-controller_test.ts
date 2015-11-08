///<reference path='../../../typings/tsd.d.ts' />

module auth.login {

  /* global describe, beforeEach, it, expect, inject, module */
  'use strict';

  describe('LoginCtrl', function () {
    var ctrl:LoginCtrl;

    beforeEach(angular.mock.module('auth.login'));

    beforeEach(inject(function ($rootScope, $controller) {
      ctrl = $controller('LoginCtrl');
    }));

    it('should have an empty email and empty password initially', ()  => {
      expect(ctrl.email).toBe(null);
      expect(ctrl.password).toBe(null);
    });

  });
}
