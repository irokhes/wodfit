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