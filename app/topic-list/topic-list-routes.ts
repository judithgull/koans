module topicList {
  "use strict";

  angular
    .module("topicList")
    .config(($stateProvider:ng.ui.IStateProvider) => {
      $stateProvider
        .state("main.home.topicList", {
          url: "/topic-list",
          templateUrl: "topic-list/topic-list.tpl.html",
          controller: "TopicListCtrl",
          controllerAs: "topicList"
        });
    });
}
