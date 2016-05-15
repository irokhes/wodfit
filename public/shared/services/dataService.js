(function(){
    app.service('dataService', function(){
        data = {};
        this.setWod = function(id, wod){
            data[id] = wod;
        };
        this.getWod = function(id){
            return data[id];
        };
    });
})();