/*global describe, beforeEach, it, browser, expect */
'use strict';

var HomePagePo = require('./home.po');

describe('Home page', function () {
  var homePage;

  beforeEach(function () {
    homePage = new HomePagePo();
    browser.get('/#/home');
  });

  it('should say HomeCtrl', function () {
    expect(homePage.heading.getText()).toEqual('home');
    expect(homePage.text.getText()).toEqual('HomeCtrl');
  });
});
