module editTopic {
  "use strict";

  angular
    .module("editTopic")
    .config(($stateProvider:ng.ui.IStateProvider) => {
      $stateProvider
        .state("main.editTopic", {
          url: "/edit-topic/:id?",
          templateUrl: "edit-topic/edit-topic.tpl.html",
          controller: "EditTopicCtrl",
          controllerAs: "editTopic",
          resolve: {
            libs: function (RestClient:core.IRestClient) {
              return RestClient.getDefaultLibs();
            },
            topic: (RestClient:core.IRestClient, $stateParams, $q:ng.IQService) => {
              if ($stateParams.id) {
                return RestClient.getTopic($stateParams.id);
              } else {
                var deferred = $q.defer();
                deferred.resolve(new core.Topic());
                return deferred.promise;
              }
            }
          }
        });
    });
}
