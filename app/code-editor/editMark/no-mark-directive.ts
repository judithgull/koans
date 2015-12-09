module NoMark {
  'use strict';

  class NoMarkAnnotation implements AceAjax.Annotation{
    public type = 'error';
    public id = 'NoMark';

    constructor(public row,
                public column,
                public text = 'Please replace ??? with the correct answer!'
    ){}
  }


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
        link: (scope:ng.IScope, elm:JQuery, attrs:ng.IAttributes,controllers) => {
          var editor:AceAjax.Editor = controllers[0].editor;

          controllers[1].$validators['noMark'] = (value) => !editMarker.containsMark(value);

          var contains = (annotations:AceAjax.Annotation[], id:string) => {
            for(var i = 0;i<annotations.length;i++){
              if(annotations[i]['id'] === id){
                return true;
              }
            }
            return false;
          };
          var uppdateMarkAnnotation = () => {
            var annotations:AceAjax.Annotation[] = editor.getSession().getAnnotations();
            var annotation = new NoMarkAnnotation(0,0);
            var containsMark = editMarker.containsMark(editor.getSession().getValue());
            var containsAnnotation = contains(annotations, 'NoMark');
            if(!containsAnnotation && containsMark){
              annotations.unshift(annotation);
              editor.getSession().setAnnotations([annotation]);
            }else if(containsAnnotation && !containsMark){
              editor.getSession().setAnnotations([]);
            }
          };

          editor.getSession().on("changeAnnotation", uppdateMarkAnnotation);
        }
      }
    }]);
}
