module MarkerRequired {
  "use strict";

  /**
   * @ngdoc directive
   * @name editTopic.directive:markerRequired
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
   <example module="editTopic">
   <file name="index.html">
   <marker-required></marker-required>
   </file>
   </example>
   *
   */
  angular
    .module("codeEditor")
    .directive("markRequired", ["EditMark", (editMarker:codeEditor.EditMark):ng.IDirective => {
      return {
        restrict: "A",
        require: "ngModel",
        link: (scope:ng.IScope, elm:JQuery, attrs:ng.IAttributes, ngModel:ng.INgModelController) => {
          ngModel.$validators["markRequired"] = (value) => editMarker.containsMark(value);
        }
      };
    }]);
}
