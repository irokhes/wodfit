var baseService = require('../baseService.js');

var Exercise = require('../../models/exercise.js');
var util = require('util');
var promise = require('bluebird');

function ExerciseService() {
    baseService.call(this);
}
util.inherits(ExerciseService, baseService);

ExerciseService.prototype.getAll = function(){
    var self = this;
    return  new promise(function(resolve, reject){
       return Exercise.find().exec().then(function(result){
           return resolve(result);
       });
    });
}

module.exports = ExerciseService;