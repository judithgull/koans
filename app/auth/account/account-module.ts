import {AccountCtrl} from "./account-controller";
import * as angular from "angular";
import uirouter from "angular-ui-router";
import {account} from "./account-directive";
import auth from "../auth-module";

export default "auth.account";
  /**
   * @ngdoc object
   * @name auth.account
   * @description account overview (sign-up, login, logout)
   *
   **/
angular
    .module("auth.account",
      ["ui.router",
      auth
      ]
    )
    .controller("AccountCtrl", AccountCtrl)
    .directive("account", account);

