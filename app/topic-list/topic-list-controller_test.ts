module topicList {
  "use strict";

  describe("Topic List Controller", () => {
    var topics = core.testUtil.MockData.getTopics();
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
