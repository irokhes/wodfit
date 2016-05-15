var BaseController = require('../basecontroller.js');
var ExerciseService = require('../../services/exercises/exerciseservice.js');
exports.get = function (req, res, next) {
    BaseController.call(this,req, res);
    var self = this;
    var id = req.params.id;
    if(id === undefined){
        return self.responseError('Invalid exercise id');
    }
    var service = new ExerciseService();
    service.get(id).then(function(result) {
        return self.responseJSON(res,result);
    }).catch(function(err) {
        return self.responseError(res, err, 500);
    });
}
exports.getAll = function (req, res, next) {
    BaseController.call(this,req, res);

    var self = this;
    var service = new ExerciseService();
    service.getAll().then(function(result) {
        return self.responseJSON(res,result);
    }).catch(function(err) {
        return self.responseError(res, err, 500);
    });
}