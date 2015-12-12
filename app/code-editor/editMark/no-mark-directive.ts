module NoMark {
  'use strict';


  /**
   * @ngdoc Validates, if no edit mark is available in the ng.Model value
   * @name codeEditor.directive:noMark
   * @restrict A
   * @element
   *
   * @description
   *
   * @example
   <example module="codeEditor">
   <file name="index.html">
   <no-mark></no-mark>
   </file>
   </example>
   *
   */
  angular.module('codeEditor')
    .directive('noMark', ['EditMarker', (editMarker:codeEditor.EditMarker):ng.IDirective => {
      return {
        restrict: 'A',
        require: ['^codeEditor', 'ngModel'],
        link: (scope:ng.IScope, elm:JQuery, attrs:ng.IAttributes, controllers:any[]) => {

          var editor:AceAjax.Editor = controllers[0].editor;
          var session: AceAjax.IEditSession = editor.getSession();
          let errorText = 'Please replace ??? with the correct answer!';

          controllers[1].$validators['noMark'] = (value) => !editMarker.containsMark(value);

          var getMarkers = ():AceAjax.Annotation[] => {
            var ranges = editMarker.getEditMarks(session.getValue());
            return ranges.map((r) => new codeEditor.NoMarkAnnotation(r.row, r.column, errorText));
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
