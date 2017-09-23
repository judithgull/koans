import * as angular from "angular";
import uirouter from "angular-ui-router";
import core from "../../core/core-module";
import codeEditor from "../../code-editor/code-editor-module";
import { ExerciseCtrl } from "./exercise-controller";
import { SolutionCtrl } from "./solution/solution-controller";

export default "topic.exercise";

  /** @ngdoc object
   * @name topic.exercise
   * @description Module for solving an exercise (validate, run, show errors and success)
   */
angular
    .module("topic.exercise", [
      "ui.router",
      codeEditor,
      core
    ])
    .controller("ExerciseCtrl", ExerciseCtrl)
    .controller("SolutionCtrl", SolutionCtrl);
