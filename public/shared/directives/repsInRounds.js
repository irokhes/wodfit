(function() {
    app.directive("repsInRounds", function() {
        return {
            restrict: "E",
            replace: true,
            template: '<div class="form-group" ng-repeat="round in repsInRounds track by $index">' +
                        '<label for="typeOfWOd" class="col-sm-2 control-label">Reps round {{ $index }}:</label>'+
                        '<div class="col-sm-2">'+
                            '<div class="col-sm-5">{{round}}'+
                                '<input type="text" ng-model="repsInRounds[$index]" class="form-control" id="inputDescription" placeholder="00">'+
                            '</div>'+
                        '</div>'+
                    '</div>'
        };
    });
})();
