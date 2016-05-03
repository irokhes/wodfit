(function() {
    'use strict';
    app.controller('maxRepController', ['$scope', '$uibModal', '$location', 'maxRepService', '$filter', function ($scope, $uibModal, $location, maxRepService, $filter) {
        $scope.exercices = [];
        $scope.totalExercises = 0;
        $scope.filteredExercises = [];
        $scope.totalFilteredExercises = 0;
        $scope.filterValue = '';
        $scope.showExerciseDetails = showExerciseDetails;
        $scope.newExercise = newExercise;
        $scope.edit = edit;
        $scope.deleteExercise = deleteExercise;
        $scope.filter = filter;
        init();

        function init() {
            getExercises();
        };

        function showExerciseDetails(id) {
            $location.path('/maxReps/detail/' + id);
        }

        function newExercise() {
            $location.path('/maxRep/new');
        }

        function edit (id) {
            $location.path('/maxReps/detail/' + id);
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
            $scope.filteredExercises = $filter('maxRepFilter')($scope.exercices, $scope.filterValue);
            $scope.totalFilteredExercises = $scope.filteredExercises.length;
        }

        function getExercises() {
            maxRepService.getAll().success(function (exercises) {
                $scope.exercices = exercises;
                $scope.totalExercises = $scope.exercices.length;
                filterExercises();
                })
            .error(function (error) {
                $scope.status = 'Unable to load exercises: ' + error.message;
            });
        }
    }]);
})();