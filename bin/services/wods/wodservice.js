var baseService = require('../baseservice.js');

var Wod = require('../../models/wod.js');
var util = require('util');
var promise = require('bluebird');

function WodService() {
    baseService.call(this);
}
util.inherits(WodService, baseService);

WodService.prototype.getAll = function(){
    var self = this;
    return  new promise(function(resolve, reject){
       return Wod.find().exec().then(function(result){
           self.setModel(result);
           return resolve(self._success());
       });
    });
}

module.exports = WodService;