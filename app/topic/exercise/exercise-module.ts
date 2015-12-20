module topic.exercise {
  "use strict";

  /** @ngdoc object
   * @name topic.exercise
   * @description Module for solving an exercise (validate, run, show errors and success)
   */
  angular
    .module("topic.exercise", [
      "ui.router",
      "codeEditor",
      "core"
    ]);
}
