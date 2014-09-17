'use strict';

angular.module('reservoirApp')
    .controller('ReservationEditController', ['$scope', '$modalInstance', '$http', '$stateParams', '$location', 'inputService', 'reservationService', function ($scope, $modalInstance, $http, $stateParams, $location, inputService, reservationService) {

        function completeModel() {
            $scope.newCustomer = {};
        }

        $http.get('/api/customers').success(function (customers) {
            $scope.customerList = customers;
        });

        $scope.getCustomers = function(name) {
            return _.filter($scope.customerList, function(s) { return s.name.toLowerCase().indexOf(name.toLowerCase()) >= 0; });
        };

        var reservationId = $stateParams.id;
        if (reservationId && reservationId.length > 0) {
            $http.get('/api/reservations/' + reservationId).success(function (reservation) {
                $scope.reservation = reservation;
                if (reservation.scheduled_datetime) {
                    var schedDate = new Date($scope.reservation.scheduled_datetime);
                    $scope.reservation.time_value = (schedDate.getHours() * 60) + (schedDate.getMinutes() * 15);
                    console.log('$scope.reservation on load: ', $scope.reservation);
                    $scope.reservation.scheduled_datetime = reservation.scheduled_datetime.toDateString();
                }
                completeModel();
                console.log('existing res:', $scope.reservation);
            });
        } else {
            $scope.reservation = {};
            $scope.reservation.scheduled_datetime = new Date(new Date().toDateString());
            console.log('scheduled_datetime:' + new Date((new Date()).toDateString()));
            completeModel();
            console.log('new res:', $scope.reservation);
        }

        function saveReservation() {
            if (reservationId && reservationId.length > 0) {
                $http.put('/api/reservations/' + reservationId, $scope.reservation).success(function (data) {
                    $modalInstance.close(data);
                });
            }
            else {
                $scope.reservation.status = 'Open';
                $http.post('/api/reservations', $scope.reservation).success(function (data) {
                    $modalInstance.close(data);
                });
            }
        }
        $scope.saveReservation = function () {
            var parts = $scope.reservation.scheduled_datetime.split('-');
            $scope.reservation.scheduled_datetime = new Date(new Date(parts[0], parts[1]-1, parts[2]).getTime() + ($scope.reservation.time_value * 60000));

            if($scope.newCustomer && $scope.newCustomer.name) {
                $http.post('/api/customers', $scope.newCustomer).success(function (customer) {
                    console.log('customer:' + customer);
                    $scope.reservation.customer = customer._id;
                    saveReservation();
                });
            } else {
                $scope.reservation.customer = $scope.reservation.customer._id;
                saveReservation();
            }
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        }

        $scope.timeList = reservationService.getAvailableTimes();

        inputService.checkForDateInputs();
    }]);
