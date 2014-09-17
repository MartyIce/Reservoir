'use strict';

angular.module('reservoirApp')
  .controller('seatChartController', function ($scope, $http, seatingService) {

        $http.get('/api/tables').success(function (tables) {
            $scope.tableList = tables;
            _.each($scope.tableList, function(t) {
                var seat = seatingService.findSeat($scope.seatRows, t.row, t.col);
                if(seat) {
                    seat.table = t;
                }
            });

        });

        var cols = 10, rows = 10;
        if(!$scope.seatRows) {
            $scope.seatRows = [];
            for(var i = 0; i < rows; i++) {
                var row = { seats: []};
                for(var j = 0; j < cols; j++) {
                    row.seats.push({name: '', row: i, col: j});
                }
                $scope.seatRows.push(row);
            }
        }

        $scope.$on('seatSelected', function(event, seat) {
            $('.seat-name').focus();
        });

        function saveTable(table) {
            if(table.name && table.name.length > 0) {
                if(table._id && table._id.length > 0) {
                    $http.put('/api/tables/' + table._id, table).success(function() {
                        console.log('updated successfully!');
                    });
                }
                else {
                    $http.post('/api/tables', table).success(function() {
                        console.log('created successfully!');
                    });
                }
            } else if(table._id) {
                $http.delete('/api/tables/' + table._id).success(function() {
                    console.log('deleted successfully!');
                });
            }
        }
        $scope.saveTables = function() {
            _.each($scope.seatRows, function(sr) {
                _.each(sr.seats, function(s) {
                    if(s.table) {
                        saveTable(s.table);
                    }
                });
            })
        }
    });