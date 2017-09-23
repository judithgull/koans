import * as angular from "angular";
import {IUrlRouterProvider, IStateProvider} from "angular-ui-router";

declare const require:any;

// tslint:disable-next-line:no-submodule-imports
require("../assets/icon-typescript.svg");
require("../assets/icon-javascript.svg");

export const topicListRoutes = ($stateProvider) => {
      $stateProvider
        .state("main.home.topicList", {
          url: "/topic-list",
          template: require("./topic-list.tpl"),
          controller: "TopicListCtrl",
          controllerAs: "topicList"
        })
      };
