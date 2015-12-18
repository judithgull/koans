module codeEditor {
  import Annotation = AceAjax.Annotation;
  "use strict";

  /**
   * @ngdoc directive
   * @name codeEditor.directive:sameAsExceptMark
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
   <example module="codeEditor">
   <file name="index.html">
   <same-as-except-mark></same-as-except-mark>
   </file>
   </example>
   *
   */
  angular
    .module("codeEditor")
    .directive("sameAsExceptMark", ["EditMarker", (editMarker:codeEditor.EditMarker):ng.IDirective => {
      return {
        restrict: "A",
        require: ["^codeEditor", "ngModel"],
        link: (scope:ng.IScope, elm:JQuery, attrs:ng.IAttributes, controllers:any[]) => {
          let ngModel = controllers[1];
          var editor:AceAjax.Editor = controllers[0].editor;
          var session = editor.getSession();


          const otherModel = attrs["sameAsExceptMark"];
          ngModel.$validators["sameAsExceptMark"] = (value) => editMarker.hasOnlyMarkChanged(scope.$eval(otherModel), value);

          //trigger validation when other model value specified in attrs.sameAs is changed
          scope.$watch(otherModel, ngModel.$validate);


          let errorText = "Do not change anything other than " + editMarker.mark + "!";
          var getMarkers = ():AceAjax.Annotation[] => {
            var changed = editMarker.hasOnlyMarkChanged(scope.$eval(otherModel), session.getValue());
            if (!changed) {
              return [new NoMarkAnnotation(0, 0, errorText)];
            } else {
              return [];
            }
          };


          var markerAnnotations = [];
          var updateMarkers = () => {
            var newMarkers = getMarkers();
            if (!editMarker.equals(newMarkers, markerAnnotations)) {
              markerAnnotations = newMarkers;
              editMarker.setAnnotations(newMarkers, session, errorText);
            }
          };

          session.on("changeAnnotation", updateMarkers);

        }
      };
    }]);
}
