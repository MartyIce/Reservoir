'use strict';

angular.module('reservoirApp')
    .service('inputService', ['$timeout', function ($timeout) {
        var me = {};

        me.formatDate = function(model, prop) {
            if(model[prop]) {
                model[prop] = model[prop].removeTimestamp();
            }
        }

        function checkForDateInputsInternal() {
            if(!Modernizr.inputtypes.date) {
                $('input[type=date]').datepicker({
                    dateFormat: 'yy-mm-dd'
                });
            }
        }
        me.checkForDateInputs = function() {
            checkForDateInputsInternal();
            $timeout(checkForDateInputsInternal, 250);
        };

        me.addNavScrolling = function(el, tar, off) {
            el.scrollspy({
                target: tar,
                offset: off
            });
        }

        return me;
    }]);



























