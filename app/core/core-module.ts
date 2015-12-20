module core {
  "use strict";

  /** @ngdoc object
   * @name core
   * @description core functionality used in other modules.
   *
   **/
  angular
    .module("core",
    ["ui.router"]
  ).config(($urlMatcherFactoryProvider) => {
      $urlMatcherFactoryProvider.caseInsensitive(true);
      $urlMatcherFactoryProvider.strictMode(false);
    });
}
