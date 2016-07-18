//Imports
var userController = require('./bin/controllers/users/usercontroller.js');
var exerciseController = require('./bin/controllers/exercises/exercisecontroller.js');
var wodController = require('./bin/controllers/wods/wodcontroller.js');
var maxRepController = require('./bin/controllers/maxreps/maxrepcontroller.js');
var passport = require('passport');


var config = require('./config/appconfig.js');
/**
 * Init all route.
 * @method InitAllRoutes
 * */
var routes = function(app) {
    /**
     * Init webservice route.
     * @method InitWebSerivceRoutes
     * */
    function InitWebServiceRoutes(app) {
        app.route('/api/user/register/').post(userController.register);
        app.route('/api/user/login/').post(userController.login);
        app.route('/api/user/logout/').get(passport.authenticate('token', {session: false}), userController.logOut);
        app.route('/api/user/loginFb/').post(passport.authenticate('facebook-token'), userController.loginFb);

        app.route('/api/wod/:id?').get(wodController.getAll).post(wodController.create).put(wodController.update).delete(wodController.delete);
        app.route('/api/wod/detail/:id').get(wodController.get);
        
        app.route('/api/exercise/').get(exerciseController.getAll);
        
        app.route('/api/maxrep/:id?').get(maxRepController.getAll).post(maxRepController.create).put(maxRepController.update).delete(maxRepController.delete);
        app.route('/api/maxrep/detail/:id').get(maxRepController.get);
        
    }
    InitWebServiceRoutes(app);
    
    //other unregistered url will be redirected to 404 page, this line should always be the last line
    //app.get('*', errorpages.Error404);
};
module.exports = routes;