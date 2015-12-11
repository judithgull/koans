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
        link: (scope:ng.IScope, elm:JQuery, attrs:ng.IAttributes, controllers) => {
          var editor:AceAjax.Editor = controllers[0].editor;
          var markerAnnotations = [];

          controllers[1].$validators['noMark'] = (value) => !editMarker.containsMark(value);

          var getMarkers = ():AceAjax.Annotation[] => {
            var ranges = editMarker.getEditRanges(editor);
            return ranges.map((r) => new codeEditor.NoMarkAnnotation(r.start.row, r.start.column));
          };

          var updateMarkers = () => {
            var annotations:AceAjax.Annotation[] = editor.getSession().getAnnotations();
            var newMarkerAnnotations = getMarkers();
            if (!editMarker.equals(newMarkerAnnotations, markerAnnotations)) {
              markerAnnotations = newMarkerAnnotations;
              if(newMarkerAnnotations.length > 0) {
                editor.getSession().setAnnotations(newMarkerAnnotations);
              }else{
                editor.getSession().setAnnotations(annotations.filter((a) => (a['id'] !== 'NoMark')));
              }
            }
          };
          editor.getSession().on("changeAnnotation", updateMarkers);
        }
      };
    }]);
}
