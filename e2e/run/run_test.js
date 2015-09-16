/*global describe, beforeEach, it, browser, expect */
'use strict';

var RunPagePo = require('./run.po');

describe('Run page', function () {
  var runPage;

  beforeEach(function () {
    runPage = new RunPagePo();
    browser.get('/#/run');
  });

  it('should say ExerciseCtrl', function () {
    expect(runPage.heading.getText()).toEqual('run');
    expect(runPage.text.getText()).toEqual('ExerciseCtrl');
  });
});
