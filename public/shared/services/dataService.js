(function(){
    app.service('dataService', function(){
        data = {};
        this.setData = function(id, wod){
            data[id] = wod;
        };
        this.getData = function(id){
            return data[id];
        };
    });
})();