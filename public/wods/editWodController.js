(function () {
    'use strict';
    app.controller('editWodController', ['$scope', '$location', '$routeParams', 'wodService', 'exerciseService', function ($scope, $location, $routeParams, wodService, exerciseService) {


        $scope.wod = {};
        $scope.newExercise = {};

        $scope.typeOfwod = ['AMRAP', 'EMOM', 'AFAP','Rounds with break', 'PowerLifting'];
        $scope.wod.wodType = $scope.typeOfwod[0];

        $scope.repsInRounds = [];
        $scope.isRoundWithBreak = false;
        
        $scope.exercises = {};
        $scope.selectedExercise = '';
        $scope.isExerciseSelected = true;
        
        $scope.typeOfWodChanged = typeOfWodChanged;
        $scope.addExercise = addExercise;
        $scope.deleteExercise = deleteExercise;
        $scope.save = save;
        $scope.checkIfRoundsChanged = checkIfRoundsChanged;
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
        
        function converTimeToString(){
            var minutes;
            var seconds;
            if($scope.wod.minutes === undefined){
                minutes = '00';
            }else{
                minutes = $scope.wod.minutes < 10 ? '0' + $scope.wod.minutes : $scope.wod.minutes;
            }
            if($scope.wod.seconds === undefined){
                seconds = '00';
            }else{
                seconds = $scope.wod.seconds < 10 ? '0' + $scope.wod.seconds : $scope.wod.seconds;
            }
            return minutes.toString()  + seconds.toString();
        }

        function addExercise () {
            if($scope.wod.exercises === undefined){
                $scope.wod.exercises = [];
            }
            $scope.wod.exercises.push({ name: $scope.selectedExercise, numReps: $scope.newExercise.Reps, weightOrDistance: $scope.newExercise.weightOrDistance });
            resetNewExercise();
        };

        function deleteExercise (exercise) {
            var index = $scope.wod.exercises.indexOf(exercise);
            $scope.wod.exercises.splice(index, 1);
        }
        
        function typeOfWodChanged (){
            if($scope.wod.wodType === 'Rounds with break'){
                $scope.isRoundWithBreak = true;
                $scope.repsInRounds = Array(+$scope.wod.roundsOrTotalReps).fill(0);
                
            }else{
                $scope.isRoundWithBreak = false;
            }
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

        function checkIfRoundsChanged(){
            if($scope.isRoundWithBreak){
                if ( !isNaN($scope.wod.roundsOrTotalReps) && angular.isNumber(+$scope.wod.roundsOrTotalReps)) {
                    if($scope.repsInRounds.length != $scope.wod.roundsOrTotalReps){
                        $scope.repsInRounds = Array(+$scope.wod.roundsOrTotalReps).fill(0);
                    }
                }
            }
        }
        //the save method
        function save () {
            $scope.wod.time =  converTimeToString();
            var wodExercises = angular.toJson($scope.wod.exercises);
            $scope.wod.exercises = JSON.parse(wodExercises);
            var v = $scope.repsInRounds;                
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