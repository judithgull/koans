/* global describe, beforeEach, it, browser, expect */
'use strict';

var EditTopicPagePo = require('./edit-topic.po');

describe('Edit topic page', function () {
  var editTopicPage;

  beforeEach(function () {
    editTopicPage = new EditTopicPagePo();
    browser.get('/#/edit-topic');
  });

  it('should say EditTopicCtrl', function () {
    expect(editTopicPage.heading.getText()).toEqual('editTopic');
    expect(editTopicPage.text.getText()).toEqual('EditTopicCtrl');
  });
});
