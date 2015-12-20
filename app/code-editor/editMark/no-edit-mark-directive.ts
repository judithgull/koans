module codeEditor.editMark {
  "use strict";


  /**
   * @ngdoc Validates, if no edit mark is available in the ng.Model value
   * @name codeEditor.directive:noEditMark
   * @restrict A
   *
   * @description Validates that there is no edit mark available.
   * Sets validation error and annotations in code-editor, if necessary.
   *
   * @example
   <example module="codeEditor">
   <file name="index.html">
   <code-editor no-edit-mark></code-editor>
   </file>
   </example>
   *
   */
  angular.module("codeEditor")
    .directive("noEditMark", ["EditMark", (editMarker:EditMark):ng.IDirective => {
      return {
        restrict: "A",
        require: ["^codeEditor", "ngModel"],
        link: (scope:ng.IScope, elm:JQuery, attrs:ng.IAttributes, controllers:any[]) => {

          let editor:AceAjax.Editor = controllers[0].editor;
          let session:AceAjax.IEditSession = editor.getSession();
          let errorText = "Please replace ??? with the correct answer!";

          controllers[1].$validators["noMark"] = (value) => !editMarker.containsMark(value);

          let getMarkers = ():AceAjax.Annotation[] => {
            var ranges = editMarker.getEditMarks(session.getValue());
            return ranges.map((r) => new CustomAnnotation(r.row, r.column, errorText));
          };

          let markerAnnotations = [];
          let updateMarkers = () => {
            let newMarkers = getMarkers();
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
