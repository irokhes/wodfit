(function () {
    'use strict';
    app.controller('editWodController', ['$scope', '$location', '$routeParams', 'wodService', 'exerciseService', function ($scope, $location, $routeParams, wodService, exerciseService) {


        $scope.wod = {};
        $scope.newExercise = {};

        $scope.typeOfwod = ['AMRAP', 'EMOM', 'AFAP', 'PowerLifting'];
        $scope.wod.wodType = $scope.typeOfwod[0];
        $scope.deletedExercises = [];
        $scope.exercises = {};
        
        $scope.selectedExercise = '';
        $scope.isExerciseSelected = true;

        init();


        function init() {
            exerciseService.getAll().then(function (exercises) {
                $scope.exercises = exercises.data;
                $scope.wod = { minutes: 0, seconds:0 };
                if (typeof $routeParams.id !== 'undefined') {
                    wodService.get($routeParams.id).then(function (wod) {
                        $scope.wod = wod.data;

                        $scope.wod.minutes = getMinutes($scope.wod.time);
                        $scope.wod.seconds = getSeconds($scope.wod.time);
                    });
                }

            }).catch(function (error) {
                $scope.status = 'Unable to load exercises: ' + error;
                console.error('Unable to load exercises: ' + error);
            });
        }

        function getMinutes(timespan) {
            return timespan.split(':')[1];
        }

        function getSeconds(timespan) {
            return timespan.split(':')[2];
        }

        $scope.addExercise = function () {
            if($scope.wod.exercises === undefined){
                $scope.wod.exercises = [];
            }
            $scope.wod.exercises.push({ name: $scope.selectedExercise, numReps: $scope.newExercise.Reps, weightOrDistance: $scope.newExercise.weightOrDistance });
            resetNewExercise();
        };

        $scope.deleteExercise = function (exercise) {
            var index = $scope.wod.exercises.indexOf(exercise);
            $scope.wod.exercises.splice(index, 1);
        }

        $scope.deleteImage = function (image) {
            var index = $scope.wod.images.indexOf(image);
            $scope.deletedExercises.push($scope.wod.images[index]);
            $scope.wod.images.splice(index, 1);
        }

        function resetNewExercise() {
            $scope.newExercise = {};
            $scope.selectedExercise = '';
        }

        //TODO move to directive
        //Begin Calendar code

        $scope.today = function () {
            $scope.wod.date = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.wod.date = null;
        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        //End calendar code

        //the save method
        $scope.save = function () {
            var minutes = $scope.wod.minutes === undefined ? 0 : $scope.wod.minutes;
            var seconds = $scope.wod.seconds === undefined ? 0 : $scope.wod.seconds;
            $scope.wod.time =  minutes.toString()  + seconds.toString();
            var wodExercises = angular.toJson($scope.wod.exercises);
            $scope.wod.exercises = JSON.parse(wodExercises);                
            wodService.save($scope.wod.id, $scope.wod)
            .success(function (data) {
                $location.path( '/wod');
            }).
            error(function (error) {
                $scope.status = 'Unable to load exercises: ' + error.message;
                console.error('Unable to load exercises: ' + error.message);
            });
        };
    }]);
})();