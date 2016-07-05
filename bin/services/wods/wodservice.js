var baseService = require('../baseservice.js');

var Wod = require('../../models/wod.js');
var util = require('util');
var promise = require('bluebird');

function WodService() {
    baseService.call(this);
}
util.inherits(WodService, baseService);


WodService.prototype.get = function(id){
    var self = this;
    return  new promise(function(resolve, reject){
       return Wod.findById(id).exec().then(function(result){
           console.log(result);
           return resolve(result);
       });
    });
}

WodService.prototype.getAll = function(){
    var self = this;
    return  new promise(function(resolve, reject){
       return Wod.find().exec().then(function(result){
           return resolve(result);
       });
    });
}

WodService.prototype.save = function(name, type, date, time, exercises,roundsOrTotalReps, repsInRounds,timeBetweenSeries, roundsLadder){
    var self = this;
    return new promise(function(resolve, reject){
        var wod = new Wod({
           name:  name,
           type: type,
           date: date,
           time: time,
           exercises: exercises
        });
        if(roundsOrTotalReps !== undefined){
            wod.roundsOrTotalReps = roundsOrTotalReps;
        }
        if(repsInRounds !== undefined){
            wod.repsInRounds = repsInRounds;
        }
        if(timeBetweenSeries !== undefined){
            wod.timeBetweenSeries = timeBetweenSeries;
        }
        if(roundsLadder !== undefined){
            wod.roundsLadder = roundsLadder;
        }
        return wod.save().then(function (result) {
            return resolve(result);
        }).catch(function(err){
            return reject(err);
        });   
    });  
}
WodService.prototype.update = function(id, options){
    	var self = this;
    return new promise(function(resolve, reject) {
        if (!options) {
            return promise.reject(this._fail('Invalid arguments, update not performed'));
        }
        Wod.findById(id).exec().then(function(wod) {
            var changed = false;
            if (!wod) {
                return reject(self._fail('Invalid wod id', 401));
            }
            var update = {};
            if(options.name){
            	update.name = options.name;
            	changed = true;
            }
            if(options.type){
            	update.type = options.type;
            	changed = true;
            }
            if(options.date){
            	update.date = options.date;
            	changed = true;
            }
            if(options.time){
            	update.time = options.time;
            	changed = true;
            }
            if (options.exercises !== undefined && Array.isArray(options.exercises)) {
		        update.exercises = options.exercises;
		        changed = true;
		    }
            if (options.roundsOrTotalReps !== undefined) {
		        update.roundsOrTotalReps = options.roundsOrTotalReps;
		        changed = true;
		    }
            if (options.repsInRounds !== undefined) {
		        update.repsInRounds = options.repsInRounds;
		        changed = true;
		    }
            if (options.timeBetweenSeries !== undefined) {
		        update.timeBetweenSeries = options.timeBetweenSeries;
		        changed = true;
		    }
            if (!changed) {
		        return promise.reject(this._fail('Invalid arguments, update not performed', 400));
		    }
		    Wod.update({_id:id},{$set: update}).exec().then(function(wod){
        		return resolve(wod);  	
		    }).catch(function(err){
                return reject(err);
            });
         });
    });
}

module.exports = WodService;