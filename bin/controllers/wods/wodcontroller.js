var BaseController = require('../basecontroller.js');
var WodService = require('../../services/wods/wodservice.js');
exports.get = function (req, res, next) {
    BaseController.call(this,req, res);

    var self = this;
    var id = req.params.id;
    if(id === undefined){
        return self.responseError('Invalid wod id');
    }
    var service = new WodService();
    service.get(id).then(function(result) {
        return self.responseJSON(res,result);
    }).catch(function(err) {
        return self.responseError(res, err, 500);
    });
}
exports.getAll = function (req, res, next) {
    BaseController.call(this,req, res);

    var self = this;
    var service = new WodService();
    service.getAll().then(function(result) {
        return self.responseJSON(res,result);
    }).catch(function(err) {
        return self.responseError(res, err, 500);
    });
}
exports.create = function (req, res, next) {
    BaseController.call(this,req, res);
    
    var name = req.body.name;
    var type = req.body.type;
    var date = req.body.date;
    var time = req.body.time;
    var roundsOrTotalReps = req.body.roundsOrTotalReps;
    var exercises = req.body.exercises;
    var repsInRounds = req.body.repsInRounds;
    var timeBetweenSeries = req.body.timeBetweenSeries;
    
    var self = this;
    var service = new WodService();
    service.save(name, type, date, time, exercises,roundsOrTotalReps, repsInRounds, timeBetweenSeries).then(function(result) {
        return self.responseJSON(res,result);
    }).catch(function(err) {
        return self.responseError(res, err, 500);
    });
}

exports.update = function (req, res, next) {
    BaseController.call(this,req, res);
    var id = req.body._id;
    if(id === undefined){
        return self.responseError(res, 'Invalid wod Id');
    }
    var options = {
        name: req.body.name,
        type: req.body.type,
        date: req.body.date,
        time: req.body.time,
        roundsOrTotalReps: req.body.roundsOrTotalReps,
        repsInRounds: req.body.repsInRounds,
        exercises: req.body.exercises,
        timeBetweenSeries: req.body.timeBetweenSeries
    };
    var self = this;
    var service = new WodService();
    service.update(id, options).then(function(result) {
        return self.responseJSON(res,result);
    }).catch(function(err) {
        console.log(err);
        return self.responseError(res, err, 500);
    });
}