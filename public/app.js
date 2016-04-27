var app;
(function(){
    'use strict'
    app = angular.module('wodfit', ['ngRoute', 'ui.bootstrap']);
    
    app.config(function ($routeProvider) {
        $routeProvider
        .when("/workouts", {
            controller: "wodController",
            templateUrl: "wods/wod.html"
        })
        .otherwise({ redirectTo: '/workouts' });
    });
})();