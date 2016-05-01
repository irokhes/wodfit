(function() {
    app.filter('timeFilter', function () {
        return function (time) {
            var minutes = time.substring(0,2);
            var seconds = time.substring(2);
            var resultSeconds = seconds != '00' ? 'and ' + seconds + ' seconds' : ''; 
            return minutes + ' minutes' + resultSeconds;
        };
    });
})();