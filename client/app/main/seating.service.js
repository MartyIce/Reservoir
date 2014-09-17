'use strict';

angular.module('reservoirApp')
  .service('seatingService', function ($http, $q) {

        var me = {};

        me.findSeatRow = function(seatRows, row) {
            return _.find(seatRows, function(sr) {
                return _.find(sr.seats, function (s) {
                    return s.row === row;
                });
            });
        };

        me.findSeat = function(seatRows, row, col) {
            var sr = me.findSeatRow(seatRows, row);
            if(sr) {
                return _.find(sr.seats, function(s) {
                    return s.row === row && s.col === col;
                })
            }
            else {
                return null;
            }
        };

        me.createSeat = function(seatRows, table) {
            var sr = me.findSeatRow(seatRows, table.row, table.col);
            if(!sr) {
                sr = { row: table.row, seats: [] };
                seatRows.push(sr);
            }
            var s = {table: table, row: table.row, col: table.col};
            sr.seats.push(s);
            return s;
        }

        me.findSelectedTables = function(seatRows) {
            var selected = [];
            _.each(seatRows, function(sr) {
                _.each(sr.seats, function(s) {
                    if(s.selected) {
                        selected.push(s.table);
                    }
                });
            });
            return selected;
        }

        me.populateRecentlySeated = function(scope, selectedTables) {
            $q.all([$http.get('/api/reservations/seated'), $http.get('/api/tables')]).then(function(results) {
                console.log('results:', results);
                var seatedReservations = results[0].data;
                var allTables = results[1].data;

                scope.tableList = allTables;
                var seatRows = [];
                _.each(scope.tableList, function(t) {
                    var seat = me.findSeat(seatRows, t.row, t.col);
                    if(!seat) {
                        seat = me.createSeat(seatRows, t);
                    }
                    if(seat) {
                        seat.table = t;
                        var seated = _.find(seatedReservations, function(sr) {
                            return _.find(sr.tables, function(st) { return st._id === t._id; });
                        })
                        seat.alreadySeated = seated != null;
                        if(seat.alreadySeated) {
                            seat.current_party = seated;
                        }

                        var selected = _.find(selectedTables, function(st) {
                            return st._id === t._id; });
                        if(selected) {
                            seat.selected = true;
                        }
                    }
                });
                _.each(seatRows, function(sr) {
                    sr.seats = _.sortBy(sr.seats, function(s) { return s.col; });
                })
                scope.seatRows = _.sortBy(seatRows, function(sr) { return sr.row;});

            });
        }

        return me;
    });