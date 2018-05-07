angular.module('todoApp', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngAria', 'md.data.table', 'ngResource'])

    .config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function ($routeProvider, $locationProvider, $mdThemingProvider) {
        'use strict';
        $routeProvider.otherwise({redirectTo: '/'});
        // use the HTML5 History API
        $locationProvider.html5Mode(true);


        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('pink');
    }]);

