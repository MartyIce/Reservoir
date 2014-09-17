
'use strict';

angular.module('reservoirApp')
  .controller('CustomerEditController', ['$rootScope', '$scope', '$http', '$stateParams','$location', 'inputService', function ($rootScope, $scope, $http, $stateParams, $location, inputService) {
    function completeModel() {
    }
    $rootScope.editing = true;
    var customerId = $stateParams.id;
    if(customerId && customerId.length > 0) {
        $http.get('/api/customers/' + customerId).success(function(customer) {
          $scope.customer = customer;
        completeModel();
        });
    } else {
        $scope.customer = {};
        $scope.customer.creation_datetime = (new Date()).shortDateFormat();
        completeModel();
    }

    $scope.saveItem = function() {
        if(customerId && customerId.length > 0) {
            $http.put('/api/customers/' + customerId, $scope.customer).success(function() {
                $rootScope.editing = false;
                $rootScope.$emit('userAlert', {type: 'success', msg: 'Entity has been saved successfully'});
                $location.path('/customers');
            });
        }
        else {
            $http.post('/api/customers', $scope.customer).success(function() {
                $rootScope.editing = false;
                $rootScope.$emit('userAlert', {type: 'success', msg: 'Entity has been saved successfully'});
                $location.path('/customers');
            });
        }
    };

    
    $scope.currentPageNumber = 0;
  $scope.maxPageNumber = 0;

      
        $scope.listRoute = '/customers';
        inputService.checkForDateInputs();
  }]);
