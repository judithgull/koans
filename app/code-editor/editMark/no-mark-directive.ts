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
          var markerAnnotations = [];
          let errorText = 'Please replace ??? with the correct answer!';

          controllers[1].$validators['noMark'] = (value) => !editMarker.containsMark(value);

          var getMarkers = ():AceAjax.Annotation[] => {
            var ranges = editMarker.getEditRanges(editor);
            return ranges.map((r) => new codeEditor.NoMarkAnnotation(r.start.row, r.start.column, errorText));
          };

          var updateMarkers = () => {
            var annotations:AceAjax.Annotation[] = editor.getSession().getAnnotations();
            var newMarkerAnnotations = getMarkers();
            if (!editMarker.equals(newMarkerAnnotations, markerAnnotations)) {
              markerAnnotations = newMarkerAnnotations;
              if(newMarkerAnnotations.length > 0) {
                var otherCustomAnnotations = annotations.filter((a) => a['custom']).filter((a) => a.text!=errorText);
                editor.getSession().setAnnotations(newMarkerAnnotations.concat(otherCustomAnnotations));
              }else{
                editor.getSession().setAnnotations(annotations.filter((a) => (a.text !== errorText)));
              }
            }
          };
          editor.getSession().on("changeAnnotation", updateMarkers);
        }
      };
    }]);
}
