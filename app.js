/**
 * Module dependencies.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/appconfig.js');
var expressValidator = require('express-validator');
var passport = require('passport');
var db = require('./bin/models/db.js');

var TokenStrategy = require('passport-token').Strategy;
//var authservice = require('./bin/www/services/auth/authservice.js');
var app = express();
var http  =  require('http').Server(app);
// Configuration
app.use(logger('dev'));
app.disable('etag');
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use(express.static(__dirname + '/public'));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// passport.use(new TokenStrategy(function(username, token, done) {
//     var service = new authservice();
//     var result = service.validateToken(username, token);
//     if (result) {
//         return done(null, result);
//     } else {
//         return done(null, false);
//     }
// }));


require('./routes.js')(app);
http.listen(config.server.port, function() {
    console.log('Express server listening on port ' + config.server.port);
});