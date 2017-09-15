import * as angular from "angular";
import uirouter from 'angular-ui-router';
import core from "../core/core-module";
import exercise from "./exercise/exercise-module";
import { topicRoutes } from "./topic-routes";
import { TopicCtrl } from "./topic-controller";

export default "topic";

  /** @ngdoc object
   * @name topic
   * @description Module for solving an topic containing multiple exercises
   *
   */
  angular
    .module("topic", [
      core,
      exercise
    ])
    .config(topicRoutes)
    .controller("TopicCtrl", TopicCtrl);

