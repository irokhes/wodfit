(function() {
    'use strict';
    app.controller('editMaxRepController', ['$scope','$q', '$location', '$routeParams', 'maxRepService', '$filter','exerciseService','dataService', function ($scope, $q, $location, $routeParams, maxRepService, $filter, exerciseService, dataService) {
        $scope.isEditMode = false;
        $scope.save = save;
        /*       
        Calendar Options
        */

        $scope.formData = {};
        $scope.format = 'MM/dd/yyyy';
        $scope.opened = false;

        //Datepicker
        $scope.dateOptions = {
            'format': "'yy'",
            'show-weeks': false,

        };


        init();

        function init() {
            exerciseService.getAll().then(function (exercises) {
                $scope.exercises = exercises.data;
                if($routeParams.id !== undefined){
                    $scope.isEditMode = true;
                    $scope.maxRep = dataService.getData($routeParams.id);
                    var waitFor;
                    if($scope.maxRep === undefined){
                        waitFor = maxRepService.get($routeParams.id).then(function (wod) {
                            $scope.maxRep = wod.data;
                            return $q.resolve();
                        });
                    }else{
                        waitFor = $q.resolve();
                    }
                    waitFor.then(function(){
                        //$scope.maxRep.date = new Date($scope.wod.date);
                        
                    })
                }else{
                    $scope.isEditMode = false;
                    $scope.maxRep = {
                        pbs:[{
                            date : new Date()
                        }]
                    };
                }
            });
        };

        $scope.newMaxRep = function () {
            $scope.isEditMode = false;
        }

        $scope.edit = function (id) {
            $scope.isEditMode = true;
        }

        $scope.delete = function (exercise) {
            
        }


        function getMaxRepsByExerciseId(exerciseId) {
            maxRepService.get(exerciseId).success(function (maxReps) {
                $scope.maxReps = maxReps;
                })
            .error(function (error) {
                $scope.status = 'Unable to load maxReps: ' + error.message;
            });
        }
        
        function save(){
            var result;
            if($scope.isEditMode){
                result = maxRepService.update($scope.maxRep._id, $scope.maxRep);
            }else{
                result = maxRepService.save($scope.maxRep);
            }
            result.then(function(){
                $location.path( '/maxRep');
            }).catch(function(err){
                console.log(err);
            })
        }
    }]);
})();