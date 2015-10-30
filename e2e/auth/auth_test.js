/* global describe, beforeEach, it, browser, expect */
'use strict';

var AuthPagePo = require('./auth.po');

describe('Auth page', function () {
  var authPage;

  beforeEach(function () {
    authPage = new AuthPagePo();
    browser.get('/#/auth');
  });

  it('should say AuthCtrl', function () {
    expect(authPage.heading.getText()).toEqual('auth');
    expect(authPage.text.getText()).toEqual('AuthCtrl');
  });
});
