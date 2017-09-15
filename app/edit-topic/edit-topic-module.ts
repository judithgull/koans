import * as angular from "angular";
import uirouter from "angular-ui-router";
import core from "../core/core-module";
import ngMessages from "angular-messages";
import codeEditor from "../code-editor/code-editor-module";
// tslint:disable-next-line:no-duplicate-imports
import "angular-messages";
import { editTopicRoutes } from "./edit-topic-routes";
import { EditTopicCtrl } from "./edit-topic-controller";

export default "editTopic";

  /** @ngdoc object
   * @name edit-topic
   * @description module for editing existing and new topics
   */
angular
    .module("editTopic", [
      "ui.router",
      "ngMessages",
      core,
      codeEditor
    ]).config(editTopicRoutes)
    .controller("EditTopicCtrl", EditTopicCtrl);

