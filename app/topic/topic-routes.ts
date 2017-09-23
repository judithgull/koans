import {IRestClient} from "../core/rest-client-service";
import * as angular from "angular";

declare const require:any;

export const topicRoutes = ($stateProvider:ng.ui.IStateProvider) => {
      $stateProvider
        .state("main.topic", {
          abstract: true,
          url: "/topic/{topicId}",
          template: require("./topic.tpl"),
          controller: "TopicCtrl",
          controllerAs: "topic",
          resolve: {
            topicData: (RestClient:IRestClient, $stateParams) => RestClient.getTopic($stateParams.topicId),
            libs: (RestClient:IRestClient) => RestClient.getDefaultLibs()
          }
        })
        .state("main.topic.exercise", {
          abstract: true,
          url: "/exercise/{exerciseId:int}",
          params: {
            exerciseId: 1
          },
          template: require("./exercise/exercise.tpl"),
          controller: "ExerciseCtrl",
          controllerAs: "exercise",
          resolve: {
            exData: (RestClient:IRestClient, $stateParams) => RestClient.getExercise($stateParams.topicId, $stateParams.exerciseId)
          }
        })
        .state("main.topic.exercise.solution", {
          url: "/solution",
          template: require("./exercise/solution/solution.tpl"),
          controller: "SolutionCtrl",
          controllerAs: "solution"
        })
        .state("main.topic.exercise.details", {
          url: "",
          template: require("./exercise/details/details.tpl")
        });
    };

