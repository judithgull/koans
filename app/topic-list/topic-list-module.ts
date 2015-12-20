module topicList {
  "use strict";

  /** @ngdoc object
   * @name topic-list
   * @description Module for list of topics (loading, searching, displaying)
   *
   */
  angular
    .module("topicList", [
      "ui.router",
      "core",
      "dibari.angular-ellipsis"
    ]);
}
