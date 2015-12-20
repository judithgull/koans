module topic {
  "use strict";

  /** @ngdoc object
   * @name topic
   * @description Module for solving an topic containing multiple exercises
   *
   */
  angular
    .module("topic", [
      "core",
      "topic.exercise"
    ]);
}
