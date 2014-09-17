'use strict';

angular.module('reservoirApp')
  .controller('TableListController', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
    $http.get('/api/tables').success(function(tables) {
      $scope.tables = tables;
    });

    $scope.selectItem = function(item) {
        $rootScope.$emit('clearAlerts');
        $location.path('/table/edit/' + item._id);
    };
    $scope.deleteItem = function(item) {
        $http.delete('/api/tables/' + item._id).success(function() {
            $http.get('/api/tables').success(function(tables) {
              $scope.tables = tables;
            });
        });
    };
      
    $scope.addNew = function() {
        $rootScope.$emit('clearAlerts');
        $location.path('/table/edit');
    };
  }]);
