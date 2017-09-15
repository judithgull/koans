import {describe,beforeEach,afterEach,it,inject,expect} from "jasmine";
import {MockData} from "../core/test-util/test-util";
import {ITopicListCtrl} from "./topic-list-controller";
import * as angular from "angular-mocks";

module topicList {
  "use strict";

  describe("Topic List Controller", () => {
    var topics = MockData.getTopics();
    var ctrl:ITopicListCtrl;
    var rs;

    beforeEach(()=> angular.mock.module("topicList"));

    beforeEach(inject(($rootScope, $controller, $q) => {
      rs = $rootScope;

      var ds = {
        getTopics: function () {
          return $q.when(topics);
        }
      };

      var authService = {
        getLoggedInUser: () => undefined,
        isLoggedIn: () => true
      };

      ctrl = $controller("TopicListCtrl",
        {
          RestClient: ds,
          AuthService: authService
        });
    }));

    it("should be defined", () => {
      expect(ctrl).toBeDefined();
    });

    it("should have an empty topics array before data is resolved", ()  => {
      expect(ctrl.topics.length).toEqual(0);
    });

    describe("data loaded", () => {
      it("should have topics after data is loaded", () => {
        rs.$apply();
        expect(ctrl.topics.length).toBe(topics.length);
      });

    });

  });

}
