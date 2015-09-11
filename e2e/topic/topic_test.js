/*global describe, beforeEach, it, browser, expect */
'use strict';

var TopicPagePo = require('./topic.po');

describe('Topic page', function () {
  var topicPage;

  beforeEach(function () {
    topicPage = new TopicPagePo();
    browser.get('/#/topic');
  });

  it('should say TopicCtrl', function () {
    expect(topicPage.heading.getText()).toEqual('topic');
    expect(topicPage.text.getText()).toEqual('TopicCtrl');
  });
});
