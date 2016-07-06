(function(){
    'use strict';
    app.controller('wodController', ['$scope','$location','$filter','WOD_TYPE','wodService', 'dataService','modalFactory', function($scope, $location, $filter,WOD_TYPE, wodService, dataService, modalFactory){
        $scope.isReadOnly = true;
        $scope.workouts = [];
        $scope.totalWorkouts = 0;
        $scope.filteredWorkouts = [];
        $scope.totalFilteredWorkouts = 0;
        $scope.typeOfWorkout = [WOD_TYPE.ALL, WOD_TYPE.AMRAP,WOD_TYPE.EMOM, WOD_TYPE.AFAP, WOD_TYPE.ROUNDS_WITH_BREAK,WOD_TYPE.ROUNDS_FOR_TIME];
        $scope.selectedWOD = $scope.typeOfWorkout[0];
        $scope.filterValue = '';
        $scope.isRoundsWithTimeType = isRoundsWithTimeType;
        $scope.isLadder = isLadder;
        
        init();

        function init() {
            getWorkouts();
        };
        
        function isRoundsWithTimeType(wodType) {
            return wodType === WOD_TYPE.ROUNDS_WITH_BREAK;
        }

        function isLadder(wodType){
            return wodType === WOD_TYPE.LADDER;
        }

        $scope.showDetails = function(id){
            $location.path('/wod/detail/' + id);
        };

        $scope.newWorkout = function () {
            $location.path('/wod/edit');
        }

        $scope.edit = function (wod) {
            dataService.setData(wod._id, wod);
            $location.path('/wod/edit/' + wod._id);
        }

        $scope.delete = function (wod) {
            modalFactory.open('Delete Wod', 'Are you sure?').then(function(data){
                if(data === true){
                    console.log('delete');
                    wodService.delete(wod._id).success(function (workouts) {
                        var index = $scope.workouts.indexOf(wod);
                        $scope.workouts.splice(index, 1);
                    }).error(function (error) {
                        $scope.status = 'Unable delete wod: ' + error;
                    });
                }
                
            }).catch(function(err){
                console.log(err);
            });
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