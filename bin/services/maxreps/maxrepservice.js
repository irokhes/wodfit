var baseService = require('../baseservice.js');

var MaxRep = require('../../models/maxRep.js');
var util = require('util');
var promise = require('bluebird');

function MaxRepService() {
    baseService.call(this);
}
util.inherits(MaxRepService, baseService);
MaxRepService.prototype.get = function(id){
    var self = this;
    return  new promise(function(resolve, reject){
       return MaxRep.findById(id).exec().then(function(result){
           return resolve(result);
       });
    });
}
MaxRepService.prototype.getAll = function(){
    var self = this;
    return  new promise(function(resolve, reject){
       return MaxRep.find().exec().then(function(result){
           return resolve(result);
       });
    });
}

MaxRepService.prototype.save = function(newMaxRep){
    var self = this;
    
    return new promise(function(resolve, reject){
        var maxRep = new MaxRep({
           name:  newMaxRep.name,
           pbs: newMaxRep.pbs
        });
        return maxRep.save().then(function (result) {
            return resolve(result);
        }).catch(function(err){
            console.log(err);
            return reject(err);
        });   
    });  
}
MaxRepService.prototype.update = function(id, options){
    var self = this;
    
    return new promise(function(resolve, reject){
        if (!options) {
            return promise.reject(this._fail('Invalid arguments, update not performed'));
        }
        MaxRep.findById(id).then(function(result){
            var changed = false;
            if(!result){
                return reject(self._fail('Invalid max rep id', 401));
            }
            var update = {};
            if(options.name){
            	update.name = options.name;
            	changed = true;
            }
            if (options.pbs !== undefined && Array.isArray(options.pbs)) {
		        update.pbs = options.pbs;
                update.pbs = sortPbs(update.pbs);
		        changed = true;
		    }
            if (!changed) {
		        return promise.reject(this._fail('Invalid arguments, update not performed', 400));
		    }
            MaxRep.update({_id:id},{$set: update}).exec().then(function(updateResult){
                return resolve(updateResult);  	
            }).catch(function(err){
                return reject(err);
            });  
        });
    });  
}

function sortPbs(){
    return pbs.sort(function(a,b) { 
        return new Date(a.start).getTime() - new Date(b.start).getTime() 
    });
}

module.exports = MaxRepService;