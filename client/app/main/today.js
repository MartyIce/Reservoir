'use strict';

angular.module('reservoirApp')
    .controller('todayController', ['$scope', '$modal', 'reservationService', function ($scope, $modal, reservationService) {

        $scope.hasAction = function (r) {
            return r.status === 'Open';
        }
        $scope.getActionText = function (r) {
            switch (r.status) {
                case 'Open':
                    return 'Seat';
                case 'Seated':
                    return 'Seated';
                case 'Completed':
                    return 'Completed';
            }
        }
        $scope.getSeatedTime = function(r) {
            if(r.seated_by) {
                return r.seated_datetime.shortReservationTimeFormat() + ' by ' + r.seated_by.name;
            } else if (r.seated_datetime) {
                return r.seated_datetime.shortReservationTimeFormat();
            }
            else {
                return '';
            } 
        }
        $scope.getActionClass = function (r) {
            switch (r.status) {
                case 'Open':
                    return 'btn btn-success';
                case 'Seated':
                    return 'btn btn-primary';
                case 'Completed':
                    return 'btn btn-secondary';
            }
        }

        function refreshReservations() {
            reservationService.getToday().success(function (reservations) {
                $scope.reservations = reservations;
            });
        }
        refreshReservations();

        $scope.action = function (r) {

            switch (r.status) {
                case 'Open':
                case 'Seated':
                    var modalInstance = $modal.open({
                        templateUrl: 'app/main/seatCustomer.html',
                        controller: 'seatCustomerController',
                        resolve: {
                            reservationId: function () {
                                return r._id;
                            }
                        }
                    });

                    modalInstance.result.then(function (r) {
                        refreshReservations();
                    }, function () {
                    });

                    break;
            }
        };
        $scope.openTableMap = function() {
            var modalInstance = $modal.open({
                templateUrl: 'app/main/tableMap.html',
                controller: 'tableMapController'
            });
            modalInstance.result.then(function (r) {
                refreshReservations();
            }, function () {
            });
        }
        $scope.createReservation = function() {
            var modalInstance = $modal.open({
                templateUrl: 'app/reservation/edit.html',
                controller: 'ReservationEditController'
            });
            modalInstance.result.then(function (r) {
                refreshReservations();
            }, function () {
            });
        }

    }]);