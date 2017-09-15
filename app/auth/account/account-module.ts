import {AccountCtrl} from './account-controller';
import * as angular from "angular";
import uirouter from 'angular-ui-router';
import {account} from "./account-directive";

export default "auth.account";
  /**
   * @ngdoc object
   * @name auth.account
   * @description account overview (sign-up, login, logout)
   *
   **/
  angular
    .module("auth.account",
      ["ui.router"]
    )
    .controller("AccountCtrl", AccountCtrl)
    .directive("account", account);

