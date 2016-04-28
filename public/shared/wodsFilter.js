(function() {
    app.filter('wodsFilter', function () {
        return function (workouts, filterValue, typeofWOD) {
            if (!filterValue && typeofWOD === 'All')
                return workouts;
            var matches = [];

            for (var i = 0; i < workouts.length; i++) {
                var isTheRightWOD = typeofWOD === 'All' || workouts[i].WODType === typeofWOD;
                var containsSearchTerms = workouts[i].Name.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;

                if (containsSearchTerms && isTheRightWOD) {
                    matches.push(workouts[i]);

                }
            }
            return matches;
        };
    });
})();