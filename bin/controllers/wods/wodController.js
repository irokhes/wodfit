var BaseController = require('../basecontroller.js');
var WodService = require('../../services/wods/wodservice.js');
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
    var type = req.body.wodType;
    var date = req.body.date;
    var time = req.body.time;
    var exercises = req.body.exercises;
    var repsInRounds = req.body.repsInRounds;
    
    var self = this;
    var service = new WodService();
    service.save(name, type, date, time, exercises, repsInRounds).then(function(result) {
        return self.responseJSON(res,result);
    }).catch(function(err) {
        return self.responseError(res, err, 500);
    });
}