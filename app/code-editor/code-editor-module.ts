import * as angular from "angular";
import "angular-ui-ace";

import { CodeEditorCtrl } from "./code-editor-controller";
import { EditMark } from "./editMark/edit-mark-service";
import { codeEditorDirective } from "./code-editor-directive";
import { sameAsExceptEditMarkDirective } from "./editMark/same-as-except-edit-mark-directive";
import { editMarkRequiredDirective } from "./editMark/edit-mark-required-directive";
import { noEditMarkDirective } from "./editMark/no-edit-mark-directive";

export default "codeEditor";

angular.module("codeEditor", [
    "ui.ace"
])
.controller("CodeEditorCtrl", CodeEditorCtrl)
.service("EditMark", EditMark)
.directive("codeEditor",codeEditorDirective)
.directive("sameAsExceptEditMark",["EditMark",sameAsExceptEditMarkDirective])
.directive("editMarkRequired", ["EditMark", editMarkRequiredDirective])
.directive("noEditMark", ["EditMark", noEditMarkDirective]);
