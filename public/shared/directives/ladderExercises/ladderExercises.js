(function() {
    app.directive("ladderExercises", function() {
        return {
            restrict: "E",
            replace: true,
            scope: { rounds: '=', readOnly: '=', exercises: '= exercisesInRounds', deleteExercise: "=" },
            templateUrl: '/shared/directives/ladderExercises/ladderExercises.html'
        };
    });
})();
