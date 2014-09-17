'use strict';

angular.module('reservoirApp')
    .directive('wizardInputSelect', [function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'components/wizard/wizardInputSelect.directive.html',
            scope: {
                inputName: '@',
                label: '@',
                model: '=',
                modelPath: '@',
                list: '=',
                noRow: '@?',
                colWidth: '@?',
                required: '@?',
                inputDisabled: '='
            },
            link: function (scope) {
//                console.log('wizardInputSelect.scope:', scope);
            }
        };
}]);



























