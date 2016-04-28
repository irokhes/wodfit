(function() {
    'use strict';
    app.controller('navigationController',['$location', function($location) {
        this.isActive = function(path) {
            return $location.path().substr(0, path.length) == path;
        };
    }]);
})();