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
        .when("/wod/edit/:id", {
            controller: "editWodController",
            templateUrl: "wods/editWod.html"
        })
        .when("/maxrep", {
            controller: "maxRepController",
            templateUrl: "maxReps/maxRep.html"
        })
        .when("/maxrep/edit", {
            controller: "editMaxRepController",
            templateUrl: "maxReps/editMaxRep.html"
        })
        .when("/maxrep/edit/:id", {
            controller: "editMaxRepController",
            templateUrl: "maxReps/editMaxRep.html"
        })
        .otherwise({ redirectTo: '/wod' });
    });
})();