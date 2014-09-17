
'use strict';

angular.module('reservoirApp')
  .controller('EmployeeEditController', ['$rootScope', '$scope', '$http', '$stateParams','$location', 'inputService', function ($rootScope, $scope, $http, $stateParams, $location, inputService) {
    function completeModel() {
    }
    $rootScope.editing = true;
    var employeeId = $stateParams.id;
    if(employeeId && employeeId.length > 0) {
        $http.get('/api/employees/' + employeeId).success(function(employee) {
          $scope.employee = employee;
        completeModel();
        });
    } else {
        $scope.employee = {};
        $scope.employee.creation_datetime = (new Date()).shortDateFormat();
        completeModel();
    }

    $scope.saveItem = function() {
        if(employeeId && employeeId.length > 0) {
            $http.put('/api/employees/' + employeeId, $scope.employee).success(function() {
                $rootScope.editing = false;
                $rootScope.$emit('userAlert', {type: 'success', msg: 'Entity has been saved successfully'});
                $location.path('/employees');
            });
        }
        else {
            $http.post('/api/employees', $scope.employee).success(function() {
                $rootScope.editing = false;
                $rootScope.$emit('userAlert', {type: 'success', msg: 'Entity has been saved successfully'});
                $location.path('/employees');
            });
        }
    };

    
    $scope.currentPageNumber = 0;
  $scope.maxPageNumber = 0;

      
        $scope.listRoute = '/employees';
        inputService.checkForDateInputs();
  }]);
