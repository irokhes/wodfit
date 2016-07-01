﻿(function () {
    'use strict';
    app.service('wodService', ['$http', function ($http) {
        var urlBase = 'api/wod/';

        this.getAll = function() {
            return $http.get(urlBase);
        };
        
        this.save = function(wod){
             return $http.post(urlBase,
                JSON.stringify(wod),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        };
        
        this.update = function(id, wod) {
            return $http.put(urlBase + id, wod);
        }

        this.get = function (id) {
            return $http.get(urlBase + 'detail/'+ id);
        };
    }]);
})();