import * as angular from "angular";
import uirouter from 'angular-ui-router';
import core from "../core/core-module";
import ellipsis from "angular-ellipsis";
import {topicListRoutes} from './topic-list-routes';
import {TopicListCtrl} from "./topic-list-controller";
import auth from "../auth/auth-module";

import "angular-ellipsis";

export default "topicList";

  /** @ngdoc object
   * @name topic-list
   * @description Module for list of topics (loading, searching, displaying)
   *
   */
  angular
    .module("topicList", [
      "ui.router",
      core,
      "dibari.angular-ellipsis",
      auth
    ])
    .config(topicListRoutes)
    .controller("TopicListCtrl", TopicListCtrl);

