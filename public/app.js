var app;
(function(){
    'use strict'
    app = angular.module('wodfit', ['ngRoute', 'ui.bootstrap']);
    
    app.config(function ($routeProvider) {
        $routeProvider
        .when("/Wods", {
            controller: "wodController",
            templateUrl: "wods/wod.html"
        })
        .otherwise({ redirectTo: '/Wods' });
    });
})();