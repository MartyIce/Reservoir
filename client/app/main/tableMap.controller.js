'use strict';

angular.module('reservoirApp')
    .controller('tableMapController', function ($scope, $modalInstance, seatingService, $http, reservationService) {

        seatingService.populateRecentlySeated($scope);

        var currentSeat = null;
        $scope.$on('seatSelected', function(event, seat) {
            currentSeat = seat;
        });

        $scope.clearTable = function() {
            var r = currentSeat.current_party;
            if(r) {
                reservationService.completeReservation(r).success(function() {
                    currentSeat.current_party = null;
                    currentSeat.alreadySeated = false;
                });
            }
        }
        $scope.close = function() {
            $modalInstance.close();
        }

    });