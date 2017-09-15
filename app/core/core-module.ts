import * as angular from "angular";
import uirouter from 'angular-ui-router';
import {RestClient} from "./rest-client-service";
import {SearchParamsService} from "./search-param-service";
export default "core";

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
    })
    .service("RestClient", RestClient)
    .service("SearchParamsService", SearchParamsService);

