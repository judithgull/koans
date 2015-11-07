///<reference path='../../../typings/tsd.d.ts' />
module signUp.SignUpCtrl {
  /* global describe, beforeEach, it, expect, inject, module */
  'use strict';

  describe('SignUpCtrl', () => {
    var ctrl:SignUpCtrl;
    var submitUserSpy;

    beforeEach(angular.mock.module('auth.signUp'));

    beforeEach(inject( ($rootScope, $controller) =>  {
      submitUserSpy = sinon.spy();

      var mockAuthService:auth.IAuthService = {
        submitUser: submitUserSpy
      };

      ctrl = $controller('SignUpCtrl', {AuthService: mockAuthService});
    }));

    it('should have an empty user initially', ()  => {
      expect(ctrl.user).toBeDefined();
      expect(ctrl.user.email).toBe(null);
      expect(ctrl.user.name).toBe(null);
      expect(ctrl.user.password).toBe(null);
    });

    it('should call submit user once', ()  => {
      ctrl.submit();
      sinon.assert.calledOnce(submitUserSpy);
      sinon.assert.calledWith(submitUserSpy, new app.User());
    });

    it('should call submit user once with correct values', ()  => {
      const testUser = new app.User();
      testUser.name = 'testName';
      testUser.email = 'testEmail';
      testUser.password = 'testPwd';
      ctrl.user = testUser;

      ctrl.submit();
      sinon.assert.calledOnce(submitUserSpy);
      sinon.assert.calledWith(submitUserSpy, testUser);
    });


  });
}
