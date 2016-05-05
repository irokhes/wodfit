var baseService = require('../baseService.js');

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
           return resolve(result);
       });
    });
}

WodService.prototype.save = function(name, type, date, time, exercises, repsInRounds){
    var self = this;
    return new promise(function(resolve, reject){
        var wod = new Wod({
           name:  name,
           type: type,
           date: date,
           time: time,
           exercises: exercises
        });
        if(repsInRounds !== undefined){
            wod.repsInRounds = repsInRounds;
        }
        return wod.save().then(function (result) {
            return resolve(result);
        }).catch(function(err){
            console.log(err);
            return reject(err);
        });   
    });  
}

module.exports = WodService;