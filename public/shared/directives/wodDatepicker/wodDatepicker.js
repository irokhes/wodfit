(function() {
    'use strict';
    app.directive("wodDatepicker", function() {
            return {
                restrict: "E",
                scope: {
                    ngModel: "=",
                    dateOptions: "=",
                    opened: "=",
                    format: "="
                },
                link: function($scope, element, attrs) {
                    $scope.open = function(event) {
                        console.log("open");
                        event.preventDefault();
                        event.stopPropagation();
                        $scope.opened = true;
                    };

                    $scope.clear = function() {
                        $scope.ngModel = null;
                    };
                },
                templateUrl: '/shared/directives/wodDatepicker/datepicker.html'
            }
        });
})();