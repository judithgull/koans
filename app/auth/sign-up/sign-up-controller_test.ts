///<reference path='../../../typings/tsd.d.ts' />
module signUp.SignUpCtrl {
  /* global describe, beforeEach, it, expect, inject, module */
  'use strict';

  describe('SignUpCtrl', () => {
    var ctrl:SignUpCtrl;

    beforeEach(angular.mock.module('auth.signUp'));

    beforeEach(inject( ($rootScope, $controller) =>  {
      ctrl = $controller('SignUpCtrl');
    }));

    it('should have an empty user initially', ()  => {
      expect(ctrl.user).toBeDefined();
      expect(ctrl.user.email).toBe(null);
      expect(ctrl.user.name).toBe(null);
      expect(ctrl.user.password).toBe(null);
    });

  });
}
