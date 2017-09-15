import * as angular from "angular";
import uirouter from "angular-ui-router";
import auth from "../auth/auth-module";

export default "header";

  /** @ngdoc object
   * @name header
   * @description header module containing logo and account module.
   *
   */
angular
    .module("header", [
      "ui.router",
      auth
    ]);
