'use strict';

angular.module('reservoirApp')
    .directive('wizardInputTextArea', [function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'components/wizard/wizardInputTextArea.directive.html',
            scope: {
                inputName: '@',
                label: '@',
                model: '=',
                modelPath: '@',
                placeholder: '@',
                noRow: '@?',
                colWidth: '@?',
                required: '@?',
                pattern: '@?',
                inputDisabled: '='
            },
            link: function (scope) {
                // TODO - move to service?
                function initRegExpressions() {
                    scope.phone_number = /^\+?\d{3}[- ]?\d{3}[- ]?\d{4}$/;
                    scope.phone_number_text = 'Please enter a valid phone number with format 555-555-5555';
                    scope.numeric = /^\d+$/;
                    scope.numeric_text = 'Please enter a numeric value';
                }
                initRegExpressions();
            }
        };
}]);



























