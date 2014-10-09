'use strict';

angular.module('reservoirApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'cgBusy'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider
            .otherwise('/');
        // MENU ITEM BEGIN
        // MENU ITEM END
        $stateProvider.state('reservation_history', { url: '/reservations/history', templateUrl: 'app/main/history.html', controller: 'historyController' });
        $stateProvider.state('reservation_today', { url: '/', templateUrl: 'app/main/today.html', controller: 'todayController' });
        $stateProvider.state('table_list', { url: '/tables', templateUrl: 'app/table/list.html', controller: 'TableListController', authenticate: true });
        $stateProvider.state('table_edit', { url: '/table/edit', templateUrl: 'app/table/edit.html', controller: 'TableEditController', authenticate: true });
        $stateProvider.state('table_edit_id', { url: '/table/edit/:id', templateUrl: 'app/table/edit.html', controller: 'TableEditController', authenticate: true });
        $stateProvider.state('reservation_list', { url: '/reservations', templateUrl: 'app/reservation/list.html', controller: 'ReservationListController' });
        $stateProvider.state('reservation_edit', { url: '/reservation/edit', templateUrl: 'app/reservation/edit.html', controller: 'ReservationEditController' });
        $stateProvider.state('reservation_edit_id', { url: '/reservation/edit/:id', templateUrl: 'app/reservation/edit.html', controller: 'ReservationEditController' });
        $stateProvider.state('customer_list', { url: '/customers', templateUrl: 'app/customer/list.html', controller: 'CustomerListController' });
        $stateProvider.state('customer_edit', { url: '/customer/edit', templateUrl: 'app/customer/edit.html', controller: 'CustomerEditController' });
        $stateProvider.state('customer_edit_id', { url: '/customer/edit/:id', templateUrl: 'app/customer/edit.html', controller: 'CustomerEditController' });
        $stateProvider.state('employee_list', { url: '/employees', templateUrl: 'app/employee/list.html', controller: 'EmployeeListController' });
        $stateProvider.state('employee_edit', { url: '/employee/edit', templateUrl: 'app/employee/edit.html', controller: 'EmployeeEditController' });
        $stateProvider.state('employee_edit_id', { url: '/employee/edit/:id', templateUrl: 'app/employee/edit.html', controller: 'EmployeeEditController' });
        $stateProvider.state('seat_chart', { url: '/seat_chart', templateUrl: 'app/main/seatChart.html', controller: 'seatChartController' });

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    })

    .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function(response) {
                if(response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    })

    .run(function ($rootScope, $location, Auth) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
            Auth.isLoggedInAsync(function(loggedIn) {
                if (next.authenticate && !loggedIn) {
                    $location.path('/login');
                }
            });
        });
    });


































