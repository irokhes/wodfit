var BaseController = require('../basecontroller.js');
var MaxRepService = require('../../services/maxreps/maxrepservice.js');
exports.getAll = function (req, res, next) {
    BaseController.call(this,req, res);

    var self = this;
    var service = new MaxRepService();
    service.getAll().then(function(result) {
        return self.responseJSON(res,result);
    }).catch(function(err) {
        return self.responseError(res, err, 500);
    });
}