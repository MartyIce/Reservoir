'use strict';

angular.module('reservoirApp')
  .service('reservationService', function ($http, seatingService) {

        var me = {};

        function saveExisting(r) {
            var prom = $http.put('/api/reservations/' + r._id, r);
            prom.then(function(data) {
                r.__v = data.__v;
            });
            return prom;
        }

        me.getToday = function() {
            return $http.get('/api/reservations?scheduled_datetime=' + new Date(new Date().toDateString()).toISOString());
        };
        me.getDate = function(date) {
            var d = new Date(date);
            d.setDate(d.getDate()+1);
            return $http.get('/api/reservations?scheduled_datetime=' + new Date(d.toDateString()).toISOString())
        }
        me.completeReservation = function(r) {
            r.completed_datetime = new Date();
            r.status = 'Completed';
            return saveExisting(r);
        };
        me.updateReservation = function(r, seatRows) {
            var seats = seatingService.findSelectedTables(seatRows);
            r.tables = seats;
            return saveExisting(r);
        };
        me.seatReservation = function(r, seatRows) {
            r.status = 'Seated';
            return me.updateReservation(r, seatRows);
        };
        me.getAvailableTimes = function() {
            var timeList = [];
            function addAvailTime(hour, amPm) {
                for (var j = 0; j < 4; j++) {
                    var val = (hour !== 0 ? (hour > 12 ? hour - 12 : hour) : 12) + ':' + (j * 15).padLeft('00') + ' ' + amPm;
                    timeList.push({_id: ((hour * 60) + (j * 15)), name: val});
                }
            }

            addAvailTime(11, 'AM');
            for (var i = 12; i < 14; i++) {
                addAvailTime(i, 'PM');
            }
            for (var i = 17; i < 23; i++) {
                addAvailTime(i, 'PM');
            }
            return timeList;
        }

        return me;
    });