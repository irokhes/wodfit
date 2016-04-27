(function(){
    'use strict';
    app.controller('wodController', ['$scope', function($scope){
        $scope.workouts = [];
        $scope.totalWorkouts = 0;
        
        init();

        function init() {
            getWorkouts();
        };
        
        function getWorkouts() {
            workoutService.getAll().success(function (workouts) {
                $scope.workouts = workouts;
                $scope.totalWorkouts = $scope.workouts.length;
            })
            .error(function (error) {
                $scope.status = 'Unable to load workouts: ' + error.message;
            });
        }

    }]);
})();