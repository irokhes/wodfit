(function() {
    app.directive("ladderExercises", function() {
        return {
            restrict: "E",
            replace: true,
            scope: { rounds: '=', readOnly: '=', exercises: '= exercisesInRounds' },
            templateUrl: '/shared/directives/ladderExercises/ladderExercises.html'
        };
    });
})();
