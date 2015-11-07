/* global describe, beforeEach, it, browser, expect */
'use strict';

var LoginPagePo = require('./login.po');

describe('Login page', function () {
  var loginPage;

  beforeEach(function () {
    loginPage = new LoginPagePo();
    browser.get('/#/login');
  });

  it('should say LoginCtrl', function () {
    expect(loginPage.heading.getText()).toEqual('login');
    expect(loginPage.text.getText()).toEqual('LoginCtrl');
  });
});
