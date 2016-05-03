(function () {
    'use strict';
    app.service('maxRepService', ['$http', '$q', function ($http, $q) {
        var urlBase = 'api/maxrep';

        this.getAll = function () {
            return $http.get(urlBase)
        };

        this.get = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.save = function(exercise) {
            return $http.post(urlBase, exercise);
        };

        this.update = function(id, exercise) {
            return $http.put(urlBase + '/' + id, exercise);
        };

        this.delete = function(id) {
            return $http.delete(urlBase + '/' + id);
        };

    }]);
})();