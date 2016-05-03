var app;
(function(){
    'use strict'
    app = angular.module('wodfit', ['ngRoute', 'ui.bootstrap']);
    
    app.config(function ($routeProvider) {
        $routeProvider
        .when("/wod", {
            controller: "wodController",
            templateUrl: "wods/wod.html"
        })
        .when("/wod/edit", {
            controller: "editWodController",
            templateUrl: "wods/editWod.html"
        })
        .when("/maxrep", {
            controller: "maxRepController",
            templateUrl: "maxReps/maxRep.html"
        })
        .otherwise({ redirectTo: '/wod' });
    });
})();