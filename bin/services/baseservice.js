var promise = require('bluebird');

function BaseService() {
    this.model ={result:{}};
}
BaseService.prototype.setModel = function(modelClass) {
    this.model.data = modelClass;
    return this.model;
};
BaseService.prototype._returnModel = function() {
    return this.model;
};
BaseService.prototype._success = function() {
    this.model.result = {
        success : true,
        httpError : null,
        errorMsg : null,
    };
    
    return this._returnModel();
};
BaseService.prototype._fail = function(err, status) {
    var error = {err: err}
    if(status){
        error.status = status;
    }
    return error;
};
module.exports = BaseService;