'use strict';

angular.module('reservoirApp')
    .directive('editWizard', ['$rootScope', '$location', function ($rootScope, $location) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'components/wizard/editWizard.directive.html',
            link: function ($scope) {
                $scope.goNext = function () {
                    var retVal = {};
                    var isError = false;
                    $('input').each(function () {
                        $(this).trigger('validate', retVal);
                        isError = isError || retVal.isError;
                    });
                    if (!isError) {
                        $scope.currentPageNumber++;
                        if ($scope.currentPageNumber > $scope.maxPageNumber) {
                            $scope.currentPageNumber = $scope.maxPageNumber;
                        }
                    }
                };
                $scope.goBack = function () {
                    $scope.currentPageNumber--;
                    if ($scope.currentPageNumber < 0) {
                        $scope.currentPageNumber = 0;
                    }
                };
                $scope.cancelEdit = function () {
                    $rootScope.$emit('clearAlerts');
                    $rootScope.editing = false;
                    $location.path($scope.listRoute);
                };
                $scope.isLastPage = function () {
                    return $scope.currentPageNumber === $scope.maxPageNumber;
                };
                $scope.isFirstPage = function () {
                    return $scope.currentPageNumber === 0;
                };
                $scope.isPageActive = function (pageNumber) {
                    return $scope.currentPageNumber === pageNumber;
                };
            }
        };
}]);



























