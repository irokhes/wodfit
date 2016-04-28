(function(){
    'use strict';
    app.controller('wodController', ['$scope','$location','$filter','wodService', function($scope, $location, $filter, wodService){
        $scope.workouts = [];
        $scope.totalWorkouts = 0;
        $scope.filteredWorkouts = [];
        $scope.totalFilteredWorkouts = 0;
        $scope.typeOfWorkout = ['All', 'AMRAP','EMOM', 'AFAP', 'PowerLifting'];
        $scope.selectedWOD = $scope.typeOfWorkout[0];
        $scope.filterValue = '';

        init();

        function init() {
            getWorkouts();
        };

        $scope.showDetails = function(id){
            $location.path('/wods/detail/' + id);
        };

        $scope.newWorkout = function () {
            $location.path('/wods/edit');
        }

        $scope.edit = function (id) {
            $location.path('/wods/edit/' + id);
        }

        $scope.delete = function () {
            
        }

        $scope.filter = function() {
            filterWorkouts();
        };

        function getWorkouts() {
            wodService.getAll().success(function (workouts) {
                $scope.workouts = workouts;
                $scope.totalWorkouts = $scope.workouts.length;
                filterWorkouts('', 'All');
            })
            .error(function (error) {
                $scope.status = 'Unable to load Wods: ' + error.message;
            });
        }

        function filterWorkouts() {
            $scope.filteredWorkouts = $filter('wodsFilter')($scope.workouts, $scope.filterValue, $scope.selectedWOD);
            $scope.totalFilteredWorkouts = $scope.filteredWorkouts.length;
        };

    }]);
})();