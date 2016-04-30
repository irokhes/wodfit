(function () {
    'use strict';
    app.service('exerciseService', ['$http', '$q', function ($http, $q) {
        var urlBase = 'api/exercise';

        this.getAll = function () {
            var deferred = $q.defer();
            $http.get(urlBase).then(function(result){
                console.log(result);
                deferred.resolve(result.data.data);
            });
            return deferred.promise;

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