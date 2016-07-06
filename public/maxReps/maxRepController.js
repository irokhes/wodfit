(function() {
    'use strict';
    app.controller('maxRepController', ['$scope', '$uibModal', '$location', 'maxRepService', '$filter','dataService', 'modalFactory', function ($scope, $uibModal, $location, maxRepService, $filter, dataService,modalFactory) {
        $scope.exercices = [];
        $scope.totalMaxReps = 0;
        $scope.filteredMaxReps = [];
        $scope.totalFilteredMaxReps = 0;
        $scope.filterValue = '';
        $scope.showExerciseDetails = showExerciseDetails;
        $scope.newPB = newPB;
        $scope.newMaxRep = newMaxRep;
        $scope.edit = edit;
        $scope.delete = deleteMaxRep;
        $scope.filter = filter;
        init();

        function init() {
            getExercises();
        };

        function showExerciseDetails(id) {
            $location.path('/maxRep/detail/' + id);
        }

        function newPB(maxRep) {
            $location.path('/maxrep/newPB/' + maxRep._id);
        }

        function newMaxRep(){
            $location.path('/maxrep/edit');
            
        }

        function edit (maxRep) {
            dataService.setData(maxRep._id, maxRep);
            $location.path('/maxrep/edit/' + maxRep._id);
        }

        function deleteMaxRep(maxRep) {
            modalFactory.open('Delete Max Rep', 'Are you sure?').then(function(data){
                if(data === true){
                    console.log('delete');
                    maxRepService.delete(maxRep._id).success(function () {
                        var index = $scope.maxReps.indexOf(maxRep);
                        $scope.maxReps.splice(index, 1);
                    }).error(function (error) {
                        $scope.status = 'Unable delete max Rep: ' + error;
                    });
                }
            }).catch(function(err){
                console.log(err);
            });                    
        }

        function filter() {
            filterExercises();
        };

        function filterExercises() {
            $scope.filteredMaxReps = $filter('maxRepFilter')($scope.maxReps, $scope.filterValue);
            $scope.totalFilteredMaxReps = $scope.filteredMaxReps.length;
        }

        function getExercises() {
            maxRepService.getAll().success(function (exercises) {
                $scope.maxReps = exercises;
                $scope.totalMaxReps = $scope.maxReps.length;
                filterExercises();
                })
            .error(function (error) {
                $scope.status = 'Unable to load exercises: ' + error.message;
            });
        }
    }]);
})();