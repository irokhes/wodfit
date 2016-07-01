(function() {
    'use strict';
    app.controller('newPBController', ['$scope','$q', '$location', '$routeParams', 'maxRepService', '$filter','exerciseService','dataService', function ($scope, $q, $location, $routeParams, maxRepService, $filter, exerciseService, dataService) {
        $scope.save = saveNewPB;
        $scope.newPB = {date: new Date()}
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
                if($routeParams.id === undefined){
                    console.log('invalid max rep id');
                     $location.path( '/');
                }
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
                   
                })
            });
        };

        function getMaxRepsByExerciseId(exerciseId) {
            maxRepService.get(exerciseId).success(function (maxReps) {
                $scope.maxReps = maxReps;
                })
            .error(function (error) {
                $scope.status = 'Unable to load maxReps: ' + error.message;
            });
        }
        
        function saveNewPB(){
            var result;
            $scope.maxRep.pbs.push($scope.newPB);
            maxRepService.update($scope.maxRep._id, $scope.maxRep)
            .success(function(data){
                $location.path( '/maxRep');
            }).error(function(err){
                console.log(err);
            })
        }
    }]);
})();