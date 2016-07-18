var should = require('should');
var assert = require('assert');
var promise = require('bluebird');
var request = require('supertest');
var testData = require('../../testdata.js');
var _ = require('lodash');
var config = require('../../../config/appconfig.js');
var constants = require('../../../utility/constants.js');
var baseurl = config.server.url + ':' + '3015';
var baseFacebookUrl = 'https://graph.facebook.com/v2.6/';
var facebookCreateTestUser = '1737902269812460/accounts/test-users?installed=true&permissions=email&method=post&access_token='+config.facebook.access_token;
var token = '';
var _facebookUserId;
var _facebookUserToken;
var _facebookUserEmail;
var _userId;

describe('/api/user/ ', function() {
	var url = '/api/user/';

	describe('register', function(){
		it('should return an error if no user is provided', function(done) {
	            request(baseurl).post(url + 'register/').send({}).end(function(err, res) {
	            if (err) {
	                throw err;
	            }
	            res.status.should.be.equal(400);
	            done();
	        });
	    });
	    it('should register correctly and return the id and the token', function(done) {
	        request(baseurl).post(url + 'register/').send({
	            email: 'usernameTest',
	            password: 'password',
                name: 'user',
                lastName: 'test',
	        }).expect(200).expect('Content-type', /json/).end(function(err, res) {
	            if (err) {
	                throw err;
	            }
	            should.exists(res.body.data._id);
	            should.exists(res.body.data.token);
	            done();
	        });
	    });
        it('should not allow to register a customer twice', function(done) {
	        request(baseurl).post(url + 'register/').send({
	            email: 'usernameTest',
	            password: 'password',
	            language: 'es',
	        }).expect('Content-type', /json/).end(function(err, res) {
	            if (err) {
	                throw err;
	            }
	            res.status.should.equal(409);
	            done();
	        });
	    });	
	
	})
    describe('api/user/login', function(){
    	it('should return an error if no user is provided', function(done) {
            request(baseurl).post(url + 'login/').send({}).end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.status.should.equal(400);
                done();
            });
        });
        it('should return an "Invalid Login" the user is not in the database', function(done) {
            request(baseurl).post(url + 'login/').send({
                email: 'notExistingUser',
                password: 'password'
            }).end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.status.should.equal(401);
                res.body.msg.should.equal('Invalid Email');
                done();
            });
        });
        it('should return an "Invalid Password" message', function(done) {
            request(baseurl).post(url + 'login/').send({
                email: 'usernameTest',
                password: 'wrongPassword'
            }).end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.status.should.equal(403);
                res.body.msg.should.equal('Invalid Password');
                done();
            });
        });
        it('should login correctly and return the id and the token', function(done) {
            request(baseurl).post(url + 'login/').send({
                email: 'usernameTest',
                password: 'password'
            }).expect('Content-type', /json/).expect(200).end(function(err, res) {
                if (err) {
                    throw err;
                }
                should.exists(res.body.data.token);
                should.exists(res.body.data._id);
                res.body.data.token.length.should.be.above(1);
                token = res.body.data.token;
                done();
            });
        });
    })
    describe.skip('api/user/loginFb', function(){
       before(function (done) {
           request(baseFacebookUrl).get(facebookCreateTestUser).send({})
           .end(function(err, res) {
                if (err) {
                    throw err;
                }
                var response = JSON.parse(res.text);
                _facebookUserId = response.id;
                _facebookUserToken = response.access_token;
                _facebookUserEmail = response.email;
                done();
            });
       })
       it('should save the user into the databse if it is the first time login', function(done){
           request(baseurl).post(url + 'loginFb').send({
               access_token: _facebookUserToken
           }).expect(200).end(function(err, res) {
                if (err) {
                    throw err;
                }
                should.exists(res.body.data.token);
                res.body.data.token.length.should.be.above(1);
                done();
            });
       });
       it('should allow to login next times', function(done){
           request(baseurl).post(url + 'loginFb').send({
               access_token: _facebookUserToken
           }).expect(200).end(function(err, res) {
                if (err) {
                    throw err;
                }
                should.exists(res.body.data.token);
                res.body.data.token.length.should.be.above(1);
                done();
            });
       });
       after(function(done){
           request(baseFacebookUrl).delete(_facebookUserId).send({
               access_token: config.facebook.access_token
           }).end(function(err, res) {
                if (err) {
                    throw err;
                }
                var response = JSON.parse(res.text);
                response.success.should.equal(true);
                done();
                
            });
       });
    });
    describe('get user details', function(){
        it('should return the user details correctly', function(done) {
            request(baseurl).get(url).set({
                'x-username': 'usernameTest',
                'x-token': token
            }).expect('Content-type', /json/).expect(200).end(function(err, res) {
                if (err) {
                    throw err;
                }
                should.exists(res.body.data._id);
                should.exists(res.body.data.email);
                should.exists(res.body.data.name);
                should.exists(res.body.data.lastName);
                should.exists(res.body.data.phone);
                done();
            });
        });
    });
    after(function(done){
        testData.cleanUp().then(function(){
            done();
        });
    });
});