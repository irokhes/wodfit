var BaseController = require('../basecontroller.js');
var UserService = require('../../services/users/userservice.js');


exports.register = function(req, res, next) {
    BaseController.call(this, req, res);

    var email = req.body.email;
    var password = req.body.password;
    if (typeof email === 'undefined' || typeof password === 'undefined') {
        return this.responseError(res, 'Invalid user email or password');
    }
    
    var name = req.body.name;
    var lastName = req.body.lastName;
    var pushToken = req.body.pushToken;
    var self = this;
    var service = new UserService();
    service.register(email, password, language, name, lastName, pushToken).then(function(result) {
        return self.responseJSON(res,result);
    }).catch(function(err) {
        return self.responseError(res, err, 500);
    });
};
exports.login = function(req, res, next) {
    BaseController.call(this, req, res);
    var email = req.body.email;
    var password = req.body.password;
    if (typeof email === 'undefined' || typeof password === 'undefined') {
        return this.responseError(res, 'Invalid user email or password');
    }
    var self = this;
    var service = new UserService();
    service.login(email, password).then(function(result) {
        return self.responseJSON(res,result);
    }).catch(function(err) {
        return self.responseError(res, err, 500);
    });
};
exports.loginFb = function(req, res, next) {
    BaseController.call(this, req, res);
    var email = req.user.email;
    var fullName = req.user.fullName;
    if (typeof email === 'undefined') {
        return this.responseError(res, 'Invalid user email');
    }
    var self = this;
    var service = new UserService();
    service.loginFb(email, fullName, city, country, currency, sex).then(function(result) {
        return self.responseJSON(res,result);
    }).catch(function(err) {
        return self.responseError(res, err, 500);
    });
};
exports.logOut = function(token){
    var self = this;
   	return new promise(function(resolve, reject) {
            var service = new authService();
            service.logOut(token).then(function(data){
                return resolve(self._success());
            }).catch(function(err){
                self._fail(err);
            });
	 });
}