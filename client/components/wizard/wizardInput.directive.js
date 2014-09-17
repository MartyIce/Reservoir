'use strict';

angular.module('reservoirApp')
    .directive('wizardInput', [function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'components/wizard/wizardInput.directive.html',
            link: function (scope) {
                if(!scope.colWidth) {
                    scope.colWidth = '12';
                }
            }
        };
}]);



























