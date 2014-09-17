'use strict';

angular.module('reservoirApp')
    .directive('wizardInputDate', [function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'components/wizard/wizardInputDate.directive.html',
            scope: {
                inputName: '@',
                label: '@',
                model: '=',
                modelPath: '@',
                placeholder: '@',
                noRow: '@?',
                colWidth: '@?',
                required: '@?',
                inputDisabled: '='
            },
            link: function (scope) {
                if(scope.model && scope.model[scope.modelPath]){
                    scope.model[scope.modelPath] = scope.model[scope.modelPath].shortDateFormat();
                }
            }
        };
}]);



























