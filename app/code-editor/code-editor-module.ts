import * as angular from "angular";
import 'angular-ui-ace';
import "ace-builds/src-min-noconflict/ace";
import { CodeEditorCtrl } from "./code-editor-controller";
import { EditMark } from "./editMark/edit-mark-service";
import { codeEditorDirective } from "./code-editor-directive";

export default "codeEditor";

angular.module("codeEditor", [
    "ui.ace"
])
.controller("CodeEditorCtrl", CodeEditorCtrl)
.service("EditMark", EditMark)
.directive("codeEditor",codeEditorDirective);