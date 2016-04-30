﻿(function () {
    'use strict';
    app.service('wodService', ['$http', function ($http) {
        var urlBase = 'api/wod';

        this.getAll = function() {
            return $http.get(urlBase);
        };
        
        this.save = function(id, wod){
            console.log(JSON.stringify(wod));
             return $http.post(urlBase,
                JSON.stringify(wod),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        };

        this.get = function (id) {
            return $http.get(urlBase + '/'+ id);
        };

        this.update = function(id, workout) {
            return $http.put(urlBase + '/'+ id, workout);
        }

    }]);
})();