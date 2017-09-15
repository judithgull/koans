
import * as toastr from "toastr";
import * as angular from "angular";
import ngAria from "angular-aria";
import uiAce from "angular-ui-ace";
import ngAnimate from "angular-animate";
import codeEditor from "./code-editor/code-editor-module";
import topicList from "./topic-list/topic-list-module";
import topic from "./topic/topic-module";
import exercise from "./topic/exercise/exercise-module";
import editTopic from "./edit-topic/edit-topic-module";
import auth from "./auth/auth-module";
import account from "./auth/account/account-module";
import header from "./header/header-module";
import authSignup from "./auth/sign-up/sign-up-module";
import login from "./auth/login/login-module";
import {appRoutes} from "./app-routes";
import "angular-ui-router";
// tslint:disable-next-line:no-duplicate-imports
import "angular-animate";
import "angular-aria"
// tslint:disable-next-line:no-duplicate-imports
import "./topic-list/topic-list-module";

declare const require:any;

require("./app.scss");

export let app = angular
  .module("koans",[
    "ui.router",
    "ngAria",
    "ui.ace",
    codeEditor,
    topicList,
    topic,
    editTopic,
    auth,
    header,
    authSignup,
    login,
    account,
    exercise,
    "ngAnimate"
  ])
  .config(appRoutes);

// export let app = angular.module("koans", [
//     "editTopic",
//     "auth",
//     "header",
//     "ngAnimate"
//   ]);

app.run(["$rootScope", "$log", function($rootScope, $log) {
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        $log.error("statechange error: " + error);
        $log.error(error);
        $log.error(toState);
        $log.error(toParams);
        if (error.status && error.status === 404) {
          toastr.error(error.statusText);
          // setTimeout(function () {
          //  window.location.reload();
          // }, 1000);
        }
      }
    );
  }]);


