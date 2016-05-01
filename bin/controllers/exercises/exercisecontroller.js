var BaseController = require('../basecontroller.js');
var ExerciseService = require('../../services/exercises/exerciseservice.js');
exports.getAll = function (req, res, next) {
    BaseController.call(this,req, res);

    var self = this;
    var service = new ExerciseService();
    service.getAll().then(function(result) {
        console.log(result);
        return self.responseJSON(res,result);
    }).catch(function(err) {
        return self.responseError(res, err, 500);
    });
}