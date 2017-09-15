import * as angular from "angular";
import uirouter from 'angular-ui-router';
import auth from '../auth-module';
import { SignUpCtrl } from "./sign-up-controller";
import { signUpRoutes } from "./sign-up-routes";

export default "auth.signUp";

  /** @ngdoc object
   * @name auth.sign-up
   * @description account sign-up
   *
   **/
  angular
    .module("auth.signUp", [
      "ui.router",
      auth
    ])
    .controller("SignUpCtrl", SignUpCtrl)
    .config(signUpRoutes);
