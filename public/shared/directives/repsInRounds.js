(function() {
    app.directive("repsInRounds", function() {
        return {
            restrict: "E",
            replace: true,
            scope: { rounds: '=repsInRounds', readOnly: '=' },
            template: '<div><div class="form-group" ng-repeat="round in rounds track by $index">' +
                        '<label for="reps" class="col-sm-2 control-label">Reps round {{ $index + 1 }}: </label>'+
                        '<div class="col-sm-4">'+
                                '<input id="reps" type="text" ng-disabled="$parent.readOnly" ng-model="round.reps" class="form-control" id="inputDescription" placeholder="00">'+
                        '</div>'+
                    '</div></div>'
        };
    });
})();
