
'use strict';

angular.module('reservoirApp')
  .controller('TableEditController', ['$rootScope', '$scope', '$http', '$stateParams','$location', 'inputService', function ($rootScope, $scope, $http, $stateParams, $location, inputService) {
    function completeModel() {
    }
    $rootScope.editing = true;
    var tableId = $stateParams.id;
    if(tableId && tableId.length > 0) {
        $http.get('/api/tables/' + tableId).success(function(table) {
          $scope.table = table;
        completeModel();
        });
    } else {
        $scope.table = {};
        $scope.table.creation_datetime = (new Date()).shortDateFormat();
        completeModel();
    }

    $scope.saveItem = function() {
        if(tableId && tableId.length > 0) {
            $http.put('/api/tables/' + tableId, $scope.table).success(function() {
                $rootScope.editing = false;
                $rootScope.$emit('userAlert', {type: 'success', msg: 'Entity has been saved successfully'});
                $location.path('/tables');
            });
        }
        else {
            $http.post('/api/tables', $scope.table).success(function() {
                $rootScope.editing = false;
                $rootScope.$emit('userAlert', {type: 'success', msg: 'Entity has been saved successfully'});
                $location.path('/tables');
            });
        }
    };

    
    $scope.currentPageNumber = 0;
  $scope.maxPageNumber = 0;

      
        $scope.listRoute = '/tables';
        inputService.checkForDateInputs();
  }]);
