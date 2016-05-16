(function () {
    'use strict';
    app.service('maxRepService', ['$http', '$q', function ($http, $q) {
        var urlBase = 'api/maxrep/';

        this.getAll = function () {
            return $http.get(urlBase)
        };

        this.get = function (id) {
            return $http.get(urlBase + 'detail/' + id);
        };

        this.save = function(maxRep) {
            return $http.post(urlBase, JSON.stringify(maxRep),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        };

        this.update = function(id, exercise) {
            return $http.put(urlBase + id, exercise);
        };

        this.delete = function(id) {
            return $http.delete(urlBase + id);
        };

    }]);
})();