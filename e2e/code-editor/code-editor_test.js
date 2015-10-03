/* global describe, beforeEach, it, browser, expect */
'use strict';

var CodeEditorPagePo = require('./code-editor.po');

describe('Code editor page', function () {
  var codeEditorPage;

  beforeEach(function () {
    codeEditorPage = new CodeEditorPagePo();
    browser.get('/#/code-editor');
  });

  it('should say CodeEditorCtrl', function () {
    expect(codeEditorPage.heading.getText()).toEqual('codeEditor');
    expect(codeEditorPage.text.getText()).toEqual('CodeEditorCtrl');
  });
});
