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
exports.get = function (req, res, next) {
    BaseController.call(this,req, res);

    var self = this;
    var id = req.params.id;
    if(id === undefined){
        self.responseError('Invalid Max rep Id');
    }
    var service = new MaxRepService();
    service.get(id).then(function(result) {
        return self.responseJSON(res,result);
    }).catch(function(err) {
        return self.responseError(res, err, 500);
    });
}

exports.create = function (req, res, next) {
    BaseController.call(this,req, res);
    
    var name = req.body.name;
    var pbs = req.body.pbs;
    
    var self = this;
    var service = new MaxRepService();
    var maxRep = {name:name, pbs:pbs};
    service.save(maxRep).then(function(result) {
        return self.responseJSON(res,result);
    }).catch(function(err) {
        return self.responseError(res, err, 500);
    });
}
exports.update = function (req, res, next) {
    BaseController.call(this,req, res);
    var id = req.params.id;
    if(id === undefined){
        return this.responseError(res, 'Invalid max rep id');
    }
    var name = req.body.name;
    var pbs = req.body.pbs;
    
    var self = this;
    var service = new MaxRepService();
    var maxRep = {name:name, pbs:pbs};
    service.update(id, maxRep).then(function(result) {
        return self.responseJSON(res,result);
    }).catch(function(err) {
        return self.responseError(res, err, 500);
    });
}

exports.delete = function (req, res, next) {
    BaseController.call(this,req, res);
    var id = req.params.id;
    if(id === undefined){
        return this.responseError(res, 'Invalid max rep id');
    }
    
    var service = new MaxRepService();
    service.delete(id).then((result) =>{
        return this.responseNotContent(res);
    }).catch((err) =>{
        return self.responseError(res, err, 500);
    });
}