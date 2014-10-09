'use strict';

angular.module('reservoirApp')
    .controller('NavbarCtrl', function ($scope, $location, Auth) {
        $scope.menu = [
            {
                'title': 'Home',
                'link': '/'
            }
        ];

        // MENU ITEM BEGIN
        // MENU ITEM END


        var mainMenu = [
            {
                'title': 'Reservations',
                'link': '/',
                authenticate: true,
                'subItems': [
                    {
                        'title': 'Today',
                        'link': '/'
                    },
                    {
                        'title': 'History',
                        'link': '/reservations/history'
                    }
                ]
            },
            {
                'title': 'Admin',
                'link': '/admin',
                authenticate: true,
                'subItems': [
                    {
                        'title': 'Table',
                        'link': '/tables'
                    },
                    {
                        'title': 'Reservation',
                        'link': '/reservations'
                    },
                    {
                        'title': 'Customer',
                        'link': '/customers'
                    },
                    {
                        'title': 'Employee',
                        'link': '/employees'
                    },
                    {
                        'title': 'Seating',
                        'link': '/seat_chart'
                    }
                ],
            }
        ]

        $scope.menu = mainMenu;

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function (route) {
            return route === $location.path();
        };

        $scope.hasMenuSecurity = function(item) {
            if(item.authenticate) {
                return $scope.isLoggedIn();
            } else {
                return true;x
            }
        }
    });


































