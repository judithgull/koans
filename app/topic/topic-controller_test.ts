/*global describe, beforeEach, it, expect, inject, module*/
module TopicCtrl {
  "use strict";

  describe("Topic Controller", () => {
    var ctrl:TopicCtrl.ITopicCtrl;
    var topic = core.testUtil.MockData.getTopic();

    beforeEach(angular.mock.module("topic"));

    beforeEach(inject(($controller:ng.IControllerService, $state:TopicCtrl.ITopicStateService) => {
      var state = $state;
      state.params.exerciseId = topic.items[0].sortOrder;
      ctrl = <TopicCtrl.ITopicCtrl>$controller("TopicCtrl", {topicData: topic, $state: state});
    }));

    it("should be defined", () => {
      expect(ctrl).toBeDefined();
    });

    it("should have a language and title", () => {
      expect(ctrl.programmingLanguage).toBe(topic.programmingLanguage);
      expect(ctrl.title).toBe(topic.title);
    });


  });
}
