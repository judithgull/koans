/*global describe, beforeEach, it, browser, expect */
'use strict';

var SolutionPagePo = require('./solution.po');

describe('Solution page', function () {
  var solutionPage;

  beforeEach(function () {
    solutionPage = new SolutionPagePo();
    browser.get('/#/solution');
  });

  it('should say SolutionCtrl', function () {
    expect(solutionPage.heading.getText()).toEqual('solution');
    expect(solutionPage.text.getText()).toEqual('SolutionCtrl');
  });
});
