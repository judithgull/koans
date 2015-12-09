module codeEditor {
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
      require: 'ngModel',
      link: (scope:ng.IScope, elm:JQuery, attrs:ng.IAttributes, ngModel:ng.INgModelController) => {
        const otherModel = attrs['sameAsExceptMark'];
        ngModel.$validators['sameAsExceptMark'] = (value) => editMarker.hasOnlyMarkChanged(scope.$eval(otherModel),value);

        //trigger validation when other model value specified in attrs.sameAs is changed
        scope.$watch(otherModel, ngModel.$validate);
      }
    };
  }]);
}
