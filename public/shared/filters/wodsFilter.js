(function() {
    app.filter('wodsFilter', function () {
        return function (workouts, filterValue, typeofWOD) {
            if (!filterValue && typeofWOD === 'All')
                return workouts;
            var matches = [];

            for (var i = 0; i < workouts.length; i++) {
                var isTheRightWOD = typeofWOD === 'All' || workouts[i].type === typeofWOD;
                var containsSearchTerms = workouts[i].name.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;

                if (containsSearchTerms && isTheRightWOD) {
                    matches.push(workouts[i]);

                }
            }
            return matches;
        };
    });
})();