(function() {
    app.filter('timeFilter', function () {
        return function (time) {
            var minutes = Number.parseInt(time.substring(0,2));
            var seconds = Number.parseInt(time.substring(2));
            var resultSeconds = seconds != 0 ? 'and ' + seconds + ' seconds' : ''; 
            return minutes + ' minutes' + resultSeconds;
        };
    });
})();