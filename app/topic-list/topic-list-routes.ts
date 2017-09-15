import * as angular from "angular";
import {IUrlRouterProvider, IStateProvider} from "angular-ui-router";

declare const require:any;

export const topicListRoutes = 
($stateProvider) => {
      $stateProvider
        .state("main.home.topicList", {
          url: "/topic-list",
          template: require("./topic-list.tpl"),
          controller: "TopicListCtrl",
          controllerAs: "topicList"
        })
      };