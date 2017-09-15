import {MockData} from "../core/test-util/test-util";
import {ITopicStateService, ITopicCtrl} from "./topic-controller";
import {describe,beforeEach,afterEach,it,inject,expect} from "jasmine";
import * as angular from "angular-mocks";

  describe("Topic Controller", () => {
    var ctrl:ITopicCtrl;
    var topic = MockData.getTopic();

    beforeEach(angular.mock.module("topic"));

    beforeEach(inject(($controller:ng.IControllerService, $state:ITopicStateService) => {
      var state = $state;
      state.params.exerciseId = topic.items[0].sortOrder;
      ctrl = <ITopicCtrl>$controller("TopicCtrl", {topicData: topic, $state: state});
    }));

    it("should be defined", () => {
      expect(ctrl).toBeDefined();
    });

    it("should have a language and title", () => {
      expect(ctrl.programmingLanguage).toBe(topic.programmingLanguage);
      expect(ctrl.title).toBe(topic.title);
    });


  });

