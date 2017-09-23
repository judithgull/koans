import * as angular from "angular";
import uirouter from "angular-ui-router";
import auth from "../auth-module";
import { loginRoutes } from "./login-routes";
import { LoginCtrl } from "./login-controller";

export default "auth.login";

/**
   * @ngdoc object
   * @name auth.login
   * @description account login
   *
   **/
angular
    .module("auth.login", [
      "ui.router",
      auth
    ])
    .config(loginRoutes)
    .controller("LoginCtrl", LoginCtrl);
