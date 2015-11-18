/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('Topic Controller', () => {
  var ctrl: TopicCtrl.ITopicModel;
  var topic = test.MockData.getTopic();

  beforeEach(angular.mock.module('topic'));

  beforeEach(inject(($controller: ng.IControllerService, $state: TopicCtrl.ITopicStateService) => {
    var state = $state;
    state.params.exerciseId = topic.items[0].sortOrder;
    ctrl = <TopicCtrl.ITopicModel>$controller('TopicCtrl', {topicData: topic, $state:state});
  }));

  it('should be defined', () => {
    expect(ctrl).toBeDefined();
  });

  it('should have a language and title', () => {
    expect(ctrl.language).toBe(topic.language);
    expect(ctrl.title).toBe(topic.title);
  });

  it('should initially not have a previous exercise', () => {
    expect(ctrl.hasPreviousExercise()).toBe(false);
  });

  it('should initially have a next exercise', () => {
    expect(ctrl.hasNextExercise()).toBe(true);
  });


});
