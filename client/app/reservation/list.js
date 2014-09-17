'use strict';

angular.module('reservoirApp')
  .controller('ReservationListController', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
    $http.get('/api/reservations').success(function(reservations) {
      $scope.reservations = reservations;
    });

    $scope.selectItem = function(item) {
        $rootScope.$emit('clearAlerts');
        $location.path('/reservation/edit/' + item._id);
    };
    $scope.deleteItem = function(item) {
        $http.delete('/api/reservations/' + item._id).success(function() {
            $http.get('/api/reservations').success(function(reservations) {
              $scope.reservations = reservations;
            });
        });
    };
      
        $http.get('/api/customers').success(function(customers) {
            $scope.customers = customers;
        });
        $scope.getCustomerById = function(id) {
            if(!$scope.customers) {
                return '';
            }
            var results = jQuery.grep($scope.customers, function( customer, i ) {
                return ( customer._id === id );
            });
            return results[0];
        }
        
        $http.get('/api/servers').success(function(servers) {
            $scope.servers = servers;
        });
        $scope.getServerById = function(id) {
            if(!$scope.servers) {
                return '';
            }
            var results = jQuery.grep($scope.servers, function( server, i ) {
                return ( server._id === id );
            });
            return results[0];
        }
        
    $scope.addNew = function() {
        $rootScope.$emit('clearAlerts');
        $location.path('/reservation/edit');
    };
  }]);
