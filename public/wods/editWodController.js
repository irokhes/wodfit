(function () {
    'use strict';
    app.controller('editWodController', ['$scope','$q', '$location', '$routeParams','WOD_TYPE', 'wodService', 'exerciseService','dataService', function ($scope, $q, $location, $routeParams,WOD_TYPE, wodService, exerciseService, dataService) {

        $scope.isEditMode = false;
        $scope.wod = {};
        $scope.newExercise = {};

        $scope.typeOfwod = [WOD_TYPE.ALL, WOD_TYPE.AMRAP,WOD_TYPE.EMOM, WOD_TYPE.AFAP, WOD_TYPE.ROUNDS_WITH_BREAK,WOD_TYPE.ROUNDS_FOR_TIME, WOD_TYPE.LADDER];
        $scope.wod.type = $scope.typeOfwod[0];

        $scope.repsInRounds = [];
        $scope.roundsLadder = [];
        $scope.timeBetweenSeries = 0;
        $scope.isRoundWithBreak = false;
        $scope.isLadder = false;
        
        $scope.exercises = {};
        $scope.selectedExercise = '';
        $scope.isExerciseSelected = true;
        
        $scope.typeOfWodChanged = typeOfWodChanged;
        $scope.addExercise = addExercise;
        $scope.deleteExercise = deleteExercise;
        $scope.editExercise = editExercise;
        $scope.endEditMode = endEditMode;
        $scope.save = save;
        $scope.checkIfRoundsChanged = checkIfRoundsChanged;
        $scope.delete = deleteWod;
        $scope.edit = edit;
        init();


        function init() {
            exerciseService.getAll().then(function (exercises) {
                $scope.exercises = exercises.data;
                $scope.wod = { minutes: 0, seconds:0 };

                if (typeof $routeParams.id !== 'undefined') {
                    $scope.isEditMode = true;
                    $scope.wod = dataService.getData($routeParams.id);
                    var waitFor;
                    if($scope.wod === undefined){
                        waitFor = wodService.get($routeParams.id).then(function (wod) {
                            $scope.wod = wod.data;
                            return $q.resolve();
                        });
                    }else{
                        waitFor = $q.resolve()
                    }
                    waitFor.then(function(){
                        $scope.wod.minutes = getMinutes($scope.wod.time);
                        $scope.wod.seconds = getSeconds($scope.wod.time);
                        $scope.wod.date = new Date($scope.wod.date);
                        typeOfWodChanged();
                        checkIfRoundsChanged();
                    })
                }else{
                    $scope.wod.date = new Date();
                    $scope.wod.roundsOrTotalReps = 0;

                }

            }).catch(function (error) {
                $scope.status = 'Unable to load exercises: ' + error;
                console.error('Unable to load exercises: ' + error);
            });
        }

        function getMinutes(timespan) {
            return timespan.substring(0,2);
        }

        function getSeconds(timespan) {
            return timespan.substring(2,4);
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
            $scope.wod.exercises.push({ editMode: false, name: $scope.selectedExercise,
                                        numReps: $scope.newExercise.Reps, 
                                        weightOrDistance: $scope.newExercise.weightOrDistance });
            resetNewExercise();
        };

        function deleteExercise (exercise) {
            var index = $scope.wod.exercises.indexOf(exercise);
            $scope.wod.exercises.splice(index, 1);
        }

        function editExercise(exercise){
            exercise.editMode = true;
        }

        function endEditMode(exercise){
            exercise.editMode = false;
        }
        
        function typeOfWodChanged (){
            switch ($scope.wod.type) {
                case WOD_TYPE.ROUNDS_WITH_BREAK:
                    $scope.isRoundWithBreak = true;
                    $scope.isLadder = false;

                    initializeRepsInRounds();
                    break;
                case WOD_TYPE.LADDER:
                    $scope.isLadder = true;
                    $scope.isRoundWithBreak = false;

                    initializeRoundsLadder();
                    break;
                default:
                    $scope.isRoundWithBreak = false;
                    $scope.isLadder = false;
                    break;
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
                if($scope.wod.roundsOrTotalReps !== undefined && !isNaN($scope.wod.roundsOrTotalReps) && angular.isNumber(+$scope.wod.roundsOrTotalReps)) {
                    if($scope.repsInRounds.length != $scope.wod.roundsOrTotalReps){
                        initializeRepsInRounds();
                    }
                }
            }
            if($scope.isLadder){
                if($scope.wod.roundsOrTotalReps !== undefined && !isNaN($scope.wod.roundsOrTotalReps) && angular.isNumber(+$scope.wod.roundsOrTotalReps)) {
                    if($scope.roundsLadder.length != $scope.wod.roundsOrTotalReps){
                        initializeRoundsLadder();
                    }
                }
            }
        }
        
        function initializeRepsInRounds(){
            if($scope.wod.roundsOrTotalReps === undefined || !angular.isNumber(+$scope.wod.roundsOrTotalReps) || +$scope.wod.roundsOrTotalReps <= 0){
                return;
            }
            $scope.repsInRounds = Array(+$scope.wod.roundsOrTotalReps); 
            for(var i = 0; i < +$scope.wod.roundsOrTotalReps; i++){
                $scope.repsInRounds[i] = {reps:0};
            }
        }
        function initializeRoundsLadder(){
            if($scope.wod.roundsOrTotalReps === undefined 
                || !angular.isNumber(+$scope.wod.roundsOrTotalReps) 
                || +$scope.wod.roundsOrTotalReps <= 0
                || $scope.wod.exercises === undefined
                || +$scope.wod.exercises.length <= 0){
                return;
            }
            $scope.roundsLadder = Array(+$scope.wod.roundsOrTotalReps); 
            for(var i = 0; i < +$scope.wod.roundsOrTotalReps; i++){
                var roundExercises = [];
                for(var j = 0; j < +$scope.wod.exercises.length; j++){
                    roundExercises.push({round: (i + 1), name: $scope.wod.exercises[j].name, weightOrDistance: 0, numReps: 0});
                }
                $scope.roundsLadder[i] = roundExercises;
            }
        }
        function prepareDataForSaving(){
            $scope.wod.time =  converTimeToString();
            var wodExercises = angular.toJson($scope.wod.exercises);
            $scope.wod.exercises = JSON.parse(wodExercises);
            
            
            if($scope.isRoundWithBreak){
                var repsInRounds = angular.toJson($scope.repsInRounds);
                $scope.wod.repsInRounds = JSON.parse(repsInRounds);
                $scope.wod.timeBetweenSeries = $scope.timeBetweenSeries;
            }else{
                $scope.wod.repsInRounds = undefined;
                $scope.wod.timeBetweenSeries = undefined;
            }
            if($scope.isLadder){
                var roundsLadder = angular.toJson($scope.roundsLadder);
                $scope.wod.roundsLadder = JSON.parse(roundsLadder);;
            }else{
                $scope.wod.roundsLadder = undefined;
            }
        }
        //the save method
        function save () {
            prepareDataForSaving();
            var result;
            if($scope.isEditMode){
                result = wodService.update($scope.wod._id, $scope.wod);
            }else{
                result = wodService.save($scope.wod)
            }
            result.success(function (data) {
                $location.path( '/wod');
            }).error(function (error) {
                $scope.status = 'Unable to load exercises: ' + error.message;
                console.error('Unable to load exercises: ' + error.message);
            });
        };
        
        function deleteWod(){
            
        };
        
        function edit(){
             $location.path('/workouts/edit/' + id);
        };
    }]);
})();