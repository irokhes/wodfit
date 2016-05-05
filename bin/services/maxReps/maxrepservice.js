var baseService = require('../baseService.js');

var MaxRep = require('../../models/maxRep.js');
var util = require('util');
var promise = require('bluebird');

function MaxRepService() {
    baseService.call(this);
}
util.inherits(MaxRepService, baseService);

MaxRepService.prototype.getAll = function(){
    var self = this;
    return  new promise(function(resolve, reject){
       return MaxRep.find().exec().then(function(result){
           return resolve(result);
       });
    });
}

module.exports = MaxRepService;