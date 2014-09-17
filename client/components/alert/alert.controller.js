'use strict';

angular.module('reservoirApp')
    .controller('AlertCtrl', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {

        $scope.alerts = [];
        var lastAlert = null;

        $rootScope.$on('userAlert', function (event, data) {

            var exists = false;
            if (data.category) {
                var existing = _.find($scope.alerts, function (a) {
                    return a.category === data.category;
                });
                if (existing) {
                    exists = true;
                    $timeout.cancel(lastAlert);
                    lastAlert = $timeout(function () {
                        $scope.alerts.splice($scope.alerts.indexOf(existing), 1);
                    }, 5000);
                }
                else {
                    lastAlert = $timeout(function () {
                        $scope.alerts.splice($scope.alerts.indexOf(data), 1);
                    }, 5000);
                }
            }

            if(!exists) {
                $scope.alerts.push(data);
                lastAlert = $timeout(function () {
                    $scope.alerts.splice($scope.alerts.indexOf(data), 1);
                }, 5000);
            }
        });
        $rootScope.$on('clearAlerts', function (event, data) {
            $('div.alert-item').removeClass('alert-item');
            $scope.alerts = [];
        });
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
    }]);