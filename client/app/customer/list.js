'use strict';

angular.module('reservoirApp')
  .controller('CustomerListController', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
    $http.get('/api/customers').success(function(customers) {
      $scope.customers = customers;
    });

    $scope.selectItem = function(item) {
        $rootScope.$emit('clearAlerts');
        $location.path('/customer/edit/' + item._id);
    };
    $scope.deleteItem = function(item) {
        $http.delete('/api/customers/' + item._id).success(function() {
            $http.get('/api/customers').success(function(customers) {
              $scope.customers = customers;
            });
        });
    };
      
    $scope.addNew = function() {
        $rootScope.$emit('clearAlerts');
        $location.path('/customer/edit');
    };
  }]);
