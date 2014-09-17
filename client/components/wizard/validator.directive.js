'use strict';

angular.module('reservoirApp').directive('validator', ['$timeout', function ($timeout) {

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {

            var validationMessageMinLength = ' has a minimum length of ';
            var validationMessageMaxLength = ' has a maximum value of ';
            var validationMessageMinValue = ' has a minimum value of ';
            var validationMessageMaxValue = ' has a maximum value of ';
            var validationMessageNumericRequired = ' must be a numeric value.';
            //var validationRegExp = ' should match regular expression: ';
            var validationMessageRequired = ' is a required field.';

            function clearErrors() {
//                $(element).closest('.wizard-input')
//                    .find('span.text-danger')
//                    .remove();
                $(element).closest('.wizard-input').removeClass('has-error');
            }

            $.fn.addError = function (errorText) {
                return this.each(function () {
//                    var $span = $('<span class="text-danger"/>').html(errorText + '<br />');
//                    $(this).closest('.wizard-input').append($span);
                    $(this).closest('.wizard-input').addClass('has-error');
                });
            };

            function addServerValidationErrors() {
                if (scope && scope.validationMessage) {
                    element.addError(scope.validationMessage);
                }
            }

            $timeout(function () {
                addServerValidationErrors();
            }, 0);

            var checkInput = function () {
                clearErrors();
                addServerValidationErrors(); // we don't want these cleared until they resubmit
                var blurred = element;
                var isError = false;
                if (blurred) {
                    isError = ctrl.$error.required ||
                        ctrl.$error.minlength ||
                        ctrl.$error.maxLength ||
                        ctrl.$error.min ||
                        ctrl.$error.max ||
                        ctrl.$error.pattern;

                    if (ctrl.$error.required) {
                        if (scope.inputType === 2) {
                            // number
                            element.addError(scope.label + validationMessageNumericRequired);
                        } else {
                            element.addError(scope.label + validationMessageRequired);
                        }
                    }
                    else if (ctrl.$error.minlength) {
                        element.addError(scope.label + validationMessageMinLength + scope.minLength + '.');
                    }
                    else if (ctrl.$error.maxlength) {
                        element.addError(scope.label + validationMessageMaxLength + scope.maxLength + '.');
                    }
                    else if (ctrl.$error.min) {
                        element.addError(scope.label + validationMessageMinValue + scope.min + '.');
                    }
                    else if (ctrl.$error.max) {
                        element.addError(scope.label + validationMessageMaxValue + scope.max + '.');
                    }
                    else if (ctrl.$error.pattern) {
                        element.addError(scope[element.attr('data-pattern-message')]);
                    }
                }
                return isError;
            };
            element.on('focus validate', function (e, retVal) {
                var isError = false;
                if (e.type === 'focus') {
                    $(this).one('blur', function () {
                        isError = checkInput();
                    });
                } else {
                    isError = checkInput();
                }
                if(retVal) {
                    retVal.isError = isError;
                }
            });
        }
    };
}]);
