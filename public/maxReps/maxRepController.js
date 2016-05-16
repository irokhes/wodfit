(function() {
    'use strict';
    app.controller('maxRepController', ['$scope', '$uibModal', '$location', 'maxRepService', '$filter','dataService', function ($scope, $uibModal, $location, maxRepService, $filter, dataService) {
        $scope.exercices = [];
        $scope.totalMaxReps = 0;
        $scope.filteredMaxReps = [];
        $scope.totalFilteredMaxReps = 0;
        $scope.filterValue = '';
        $scope.showExerciseDetails = showExerciseDetails;
        $scope.newPB = newPB;
        $scope.edit = edit;
        $scope.deleteExercise = deleteExercise;
        $scope.filter = filter;
        init();

        function init() {
            getExercises();
        };

        function showExerciseDetails(id) {
            $location.path('/maxRep/detail/' + id);
        }

        function newPB() {
            $location.path('/maxrep/edit');
        }

        function edit (maxRep) {
            dataService.setData(maxRep._id, maxRep);
            $location.path('/maxrep/edit/' + maxRep._id);
        }

        function deleteExercise(exercise) {
            var modalInstance = $uibModal.open({
                templateUrl: '/app/ModalDialog/template.html',
                controller: 'ModalDialogCtrl',
                resolve: {
                    isOk: function () {
                        return $scope.isOk;
                    }
                }
            });

            modalInstance.result.then(function () {
                maxRepService.delete(exercise.id).success(function (data) {
                    console.info('Exercise deleted');
                    var index = $scope.filteredExercises.indexOf(exercise);
                    $scope.filteredExercises.splice(index, 1);

                }).error(function (error) {
                    $scope.status = 'Error deleting exercise: ' + error.message;
                });
            }, function () {
                //modal closed
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