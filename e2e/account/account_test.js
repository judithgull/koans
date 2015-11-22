/* global describe, beforeEach, it, browser, expect */
'use strict';

var AccountPagePo = require('./account.po');

describe('Account page', function () {
  var accountPage;

  beforeEach(function () {
    accountPage = new AccountPagePo();
    browser.get('/#/account');
  });

  it('should say AccountCtrl', function () {
    expect(accountPage.heading.getText()).toEqual('account');
    expect(accountPage.text.getText()).toEqual('AccountCtrl');
  });
});
