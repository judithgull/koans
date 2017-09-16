import * as angular from "angular";
import {MockData} from "../core/test-util/test-util";
import {ITopicStateService, ITopicCtrl} from "./topic-controller";
import {} from "jasmine";

describe("Topic Controller", () => {
    let ctrl:ITopicCtrl;
    const topic = MockData.getTopic();

    beforeEach(angular.mock.module("topic"));

    beforeEach(inject(($controller:ng.IControllerService, $state:ITopicStateService) => {
      const state = $state;
      state.params.exerciseId = topic.items[0].sortOrder;
      ctrl = $controller("TopicCtrl", {topicData: topic, $state: state}) as ITopicCtrl;
    }));

    it("should be defined", () => {
      expect(ctrl).toBeDefined();
    });

    it("should have a language and title", () => {
      expect(ctrl.programmingLanguage).toBe(topic.programmingLanguage);
      expect(ctrl.title).toBe(topic.title);
    });


  });

