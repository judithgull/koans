import { } from "./edit-topic-module";
import {Topic} from "../core/topic";
import {IRestClient} from "../core/rest-client-service";
import * as angular from "angular";

declare const require:any;

export const editTopicRoutes =  ($stateProvider) => {
      $stateProvider
        .state("main.editTopic", {
          url: "/edit-topic/:id?",
          template: require("./edit-topic.tpl"),
          controller: "EditTopicCtrl",
          controllerAs: "editTopic",
          resolve: {
            libs: function(RestClient:IRestClient) {
              return RestClient.getDefaultLibs();
            },
            topic: (RestClient:IRestClient, $stateParams, $q) => {
              if ($stateParams.id) {
                return RestClient.getTopic($stateParams.id);
              } else {
                const deferred = $q.defer();
                deferred.resolve(new Topic());
                return deferred.promise;
              }
            }
          }
        });
    };

