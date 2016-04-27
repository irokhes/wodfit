﻿(function () {
    'use strict';
    app.service('wodService', ['$http', function ($http) {
        var urlBase = 'api/wod';

        this.getAll = function() {
            return $http.get(urlBase);
        };

        this.get = function (id) {
            return $http.get(urlBase + '/'+ id);
        };

        this.update = function(id, workout) {
            return $http.put(urlBase + '/'+ id, workout);
        }

    }]);
})();