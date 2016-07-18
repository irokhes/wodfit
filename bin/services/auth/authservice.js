var baseService = require('../baseservice.js');
var redisHelper = require('../../../../utility/redisHelper.js');
var scrypt = require('scrypt');
var util = require('util');
var promise = require('bluebird');
var jwt = require('jwt-simple');
var moment = require('moment');

function AuthService() {
    baseService.call(this);
    this._secret = 'pvaleet';
    this._keyEncoding = 'ascii';
    this._kdfEncoding = 'hex';
    this._tokenDuration = 10;
}
util.inherits(AuthService, baseService);
/* Checks the password and returns a tocken */
AuthService.prototype.checkPassword = function(kdfed, password) {
    var self = this;
    return new promise(function(resolve, reject) {
        var kdfResult = new Buffer(kdfed, self._kdfEncoding);
        scrypt.verifyKdf(kdfResult, new Buffer(password), function(err, result) {
            if (err) {
                if(err.scrypt_err_code === 11)
                {
                    return resolve(false);
                }
                return reject(err);
            }
            if (result) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        });
    });
};
AuthService.prototype.generateToken = function(email) {
    var self = this;
    var secret = self._secret;
    var payload = {
        email: email,
        expirationDate: moment().add(self._tokenDuration, 'years')
    };
    var token = jwt.encode(payload, secret);
    return new promise(function(resolve, reject) {
        redisHelper.setTokenWithData(token, {email}, function(err, success){
            if(err){
                return reject(err);
            }
            if(success){
                return resolve(token);
            }else{
                return reject("Error creating auth token");
            }
        });
    });
};
AuthService.prototype.validateToken = function(email, token) {
    if(!token || !email){
        return promise.reject();
    }
    return new promise(function(resolve, reject) {
        redisHelper.getDataByToken(token, function(err, userData){
            if(err){
                return reject(err);
            }
            var decoded = jwt.decode(token, 'pvaleet');
            return resolve(decoded.email === userData.email);
        });
    });
};
AuthService.prototype.generatePassword = function(password) {
    var self = this;
    return new promise(function(resolve, reject) {
        scrypt.kdf(password, {
            N: 1,
            r: 1,
            p: 1
        }, function(err, result) {
            if (err) {
                return reject(err);
            } else return resolve(result.toString(self._kdfEncoding));
        });
    });
};
AuthService.prototype.logOut = function(token){
    var self = this;
    return new promise(function(resolve, reject) {
        redisHelper.expireToken(token, function(err, success){
            if(err){
                return reject('Error on Log out');
            }
            return resolve('ok');
        });
    });
}
module.exports = AuthService;