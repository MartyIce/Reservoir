'use strict';

angular.module('reservoirApp')
  .directive('seatChartDirective', function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'app/main/seatChart.directive.html',
            link: function (scope) {

                scope.selectSeat = function(seat) {
                    console.log('seat selected!');
                    scope.currentSeat = seat;
                    scope.$emit('seatSelected', seat);
                }

                scope.$watch('currentSeat', function(newVal, oldVal) {
                    if(oldVal !== newVal && newVal) {
                        if(!newVal.table ||
                            (newVal.table.name && newVal.table.name.length > 0 && !newVal.table.row)) {
                            if(!newVal.table) {
                                newVal.table = {};
                            }
                            newVal.table.row = newVal.row;
                            newVal.table.col = newVal.col;
                        }
                    }
                });

                scope.getSeatClass = function(seat) {
                    if(seat.selected) {
                        return 'btn-success';
                    } else if(seat.alreadySeated) {
                        return 'btn-danger';
                    } else if (seat == scope.currentSeat) {
                        return 'alert-info';
                    } else {
                        return '';
                    }
                }
            }
        };

    });