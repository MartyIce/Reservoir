'use strict';

angular.module('reservoirApp')
  .controller('historyController', function ($scope, $http, reservationService) {

        $scope.todaysDate = new Date().shortDateFormat();
        $scope.refreshDate = function() {
            reservationService.getDate($scope.todaysDate).success(function (reservations) {
                $scope.reservations = reservations;
            });

        }
        $scope.refreshDate();
        $scope.$watch(
            function() { return $scope.todaysDate; },
            function(newValue, oldValue) {
                if ( newValue !== oldValue ) {
                    $scope.refreshDate();
                }
            }
        );

        $scope.hasAction = function(r) {
            return r.status === 'Open';
        }
        $scope.executeAction = function(r) {
            switch(r.status){
                case 'Open':
                    r.customer = r.customer._id;
                    r.server = r.server._id;
                    r.status = 'Seated';
                    $http.put('/api/reservations/' + r._id, r).success(function () {
                    });

                    return 'Seat';
            }
        }
        $scope.getActionText = function(r){
            switch(r.status){
                case 'Open':
                    return 'Seat';
            }
        }
  });