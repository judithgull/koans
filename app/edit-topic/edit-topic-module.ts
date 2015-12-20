module editTopic {
  "use strict";

  /** @ngdoc object
   * @name edit-topic
   * @description module for editing existing and new topics
   */
  angular
    .module("editTopic", [
      "ui.router",
      "ngMessages",
      "core",
      "codeEditor"
    ]);
}
