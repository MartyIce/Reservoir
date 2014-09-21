'use strict';

angular.module('reservoirApp')
  .controller('seatCustomerController', ['$scope', '$modalInstance', 'reservationId', '$http', 'seatingService', 'reservationService', function ($scope, $modalInstance, reservationId, $http, seatingService, reservationService) {

        if (reservationId && reservationId.length > 0) {
            $http.get('/api/reservations/' + reservationId).success(function (reservation) {
                $scope.reservation = reservation;
                $scope.reservation.seated_datetime = new Date();
                seatingService.populateRecentlySeated($scope, $scope.reservation.tables);
                console.log('existing res:', $scope.reservation);
            });
        }
        else {
            throw 'couldnt locate reservationId'
        }


        $scope.seatCustomer = function() {
            reservationService.seatReservation($scope.reservation, $scope.seatRows).success(function(data) {
                $modalInstance.close($scope.reservation);
            });

        };
        $scope.updateReservation = function() {
            reservationService.updateReservation($scope.reservation, $scope.seatRows).success(function(data) {
                $modalInstance.close($scope.reservation);
            });

        }
        $scope.completeReservation = function() {
            reservationService.completeReservation($scope.reservation).success(function() {
                // success
                $modalInstance.close($scope.reservation);
            });

        }
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $http.get('/api/employees').success(function (employees) {
            $scope.employees = employees
        });
        $scope.getSeaters = function(name) {
            return _.filter($scope.employees, function(s) { return s.name.toLowerCase().indexOf(name.toLowerCase()) >= 0; });
        }
        // TODO - make this dynamic based on employees
        $scope.getServers = function(name) {
            return _.filter($scope.employees, function(s) { return s.name.toLowerCase().indexOf(name.toLowerCase()) >= 0; });
        }

        $scope.$on('seatSelected', function(event, seat) {
            seat.selected = !seat.selected;
            console.log('seat selected:', seat);
        });

    }]);