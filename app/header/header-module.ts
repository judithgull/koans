module header {
  "use strict";

  /** @ngdoc object
   * @name header
   * @description header module containing logo and account module.
   *
   */
  angular
    .module("header", [
      "ui.router",
      "auth"
    ]);
}
