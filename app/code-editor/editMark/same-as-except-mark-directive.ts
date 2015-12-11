module codeEditor {
  import Annotation = AceAjax.Annotation;
  'use strict';

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
    .module('codeEditor')
    .directive('sameAsExceptMark', ['EditMarker', (editMarker:codeEditor.EditMarker):ng.IDirective => {
    return {
      restrict: 'A',
      require: ['^codeEditor', 'ngModel'],
      link: (scope:ng.IScope, elm:JQuery, attrs:ng.IAttributes, controllers:any[]) => {
        console.log('linking sameAsExceptMark');
        let ngModel = controllers[1];
        var editor:AceAjax.Editor = controllers[0].editor;
        var markerAnnotations = [];
        let errorText = 'Do not change anything other than ' + editMarker.mark + '!';

        const otherModel = attrs['sameAsExceptMark'];
        ngModel.$validators['sameAsExceptMark'] = (value) => editMarker.hasOnlyMarkChanged(scope.$eval(otherModel),value);

        //trigger validation when other model value specified in attrs.sameAs is changed
        scope.$watch(otherModel, ngModel.$validate);


        var getMarkers = ():AceAjax.Annotation[] => {
          var  changed =  editMarker.hasOnlyMarkChanged(scope.$eval(otherModel), editor.getSession().getValue());
          if(!changed){
            return [new NoMarkAnnotation(0,0,errorText)];
          }else{
            return [];
          }
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
