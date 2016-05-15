var baseService = require('../baseservice.js');

var Exercise = require('../../models/exercise.js');
var util = require('util');
var promise = require('bluebird');

function ExerciseService() {
    baseService.call(this);
}
util.inherits(ExerciseService, baseService);

ExerciseService.prototype.get = function(id){
    var self = this;
    return  new promise(function(resolve, reject){
       return Exercise.findById(id).exec().then(function(result){
           return resolve(result);
       });
    });
}
ExerciseService.prototype.getAll = function(){
    var self = this;
    return  new promise(function(resolve, reject){
       return Exercise.find().exec().then(function(result){
           return resolve(result);
       });
    });
}

module.exports = ExerciseService;