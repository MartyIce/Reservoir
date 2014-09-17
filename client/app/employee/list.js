'use strict';

angular.module('reservoirApp')
  .controller('EmployeeListController', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
    $http.get('/api/employees').success(function(employees) {
      $scope.employees = employees;
    });

    $scope.selectItem = function(item) {
        $rootScope.$emit('clearAlerts');
        $location.path('/employee/edit/' + item._id);
    };
    $scope.deleteItem = function(item) {
        $http.delete('/api/employees/' + item._id).success(function() {
            $http.get('/api/employees').success(function(employees) {
              $scope.employees = employees;
            });
        });
    };
      
    $scope.addNew = function() {
        $rootScope.$emit('clearAlerts');
        $location.path('/employee/edit');
    };
  }]);
