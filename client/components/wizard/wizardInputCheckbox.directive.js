'use strict';

angular.module('reservoirApp')
    .directive('wizardInputCheckbox', [function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'components/wizard/wizardInputCheckbox.directive.html',
            scope: {
                inputName: '@',
                label: '@',
                model: '=',
                modelPath: '@',
                placeholder: '@',
                noRow: '@?',
                colWidth: '@?',
                inputDisabled: '='
            },
            link: function () {
            }
        };
}]);



























