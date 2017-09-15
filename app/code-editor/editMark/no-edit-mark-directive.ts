  import {EditMark, CustomAnnotation} from "./edit-mark-service";
  import * as angular from "angular";
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
  export const noEditMarkDirective = (editMarker:EditMark):ng.IDirective => {
      return {
        restrict: "A",
        require: ["^codeEditor", "ngModel"],
        link: (scope:ng.IScope, elm:JQuery, attrs:ng.IAttributes, controllers:any[]) => {

          const editor:any = controllers[0].editor;
          const session:any = editor.getSession();
          const errorText = "Please replace ??? with the correct answer!";

          controllers[1].$validators["noMark"] = (value) => !editMarker.containsMark(value);

          const getMarkers = ():any[] => {
            const ranges = editMarker.getEditMarks(session.getValue());
            return ranges.map((r) => new CustomAnnotation(r.row, r.column, errorText));
          };

          let markerAnnotations = [];
          const updateMarkers = () => {
            const newMarkers = getMarkers();
            if (!editMarker.equals(newMarkers, markerAnnotations)) {
              markerAnnotations = newMarkers;
              editMarker.setAnnotations(newMarkers, session, errorText);
            }
          };

          session.on("changeAnnotation", updateMarkers);
        }
      };
    };

