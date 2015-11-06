/* global describe, beforeEach, it, browser, expect */
'use strict';

var SignUpPagePo = require('./sign-up.po');

describe('Sign up page', function () {
  var signUpPage;

  beforeEach(function () {
    signUpPage = new SignUpPagePo();
    browser.get('/#/sign-up');
  });

  it('should say SignUpCtrl', function () {
    expect(signUpPage.heading.getText()).toEqual('signUp');
    expect(signUpPage.text.getText()).toEqual('SignUpCtrl');
  });
});
