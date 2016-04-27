var app;
(function(){
    'use strict'
    app = angular.module('wodfit', ['ngRoute', 'ui.bootstrap']);
    
    app.config(function ($routeProvider) {
        $routeProvider
        .when("/workouts", {
            controller: "wodController",
            templateUrl: "app/wod/wod.html"
        })
        .otherwise({ redirectTo: '/workouts' });
    });
})();