/* global describe, beforeEach, it, browser, expect */
'use strict';

var DetailsPagePo = require('./details.po');

describe('Details page', function () {
  var detailsPage;

  beforeEach(function () {
    detailsPage = new DetailsPagePo();
    browser.get('/#/details');
  });

  it('should say DetailsCtrl', function () {
    expect(detailsPage.heading.getText()).toEqual('details');
    expect(detailsPage.text.getText()).toEqual('DetailsCtrl');
  });
});
