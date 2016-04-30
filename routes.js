//Imports
var wodController = require('./bin/controllers/wods/wodcontroller.js');
var exerciseController = require('./bin/controllers/exercises/exercisecontroller.js');
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
        app.route('/api/wod/').get(wodController.getAll).post(wodController.create);
        app.route('/api/exercise/').get(exerciseController.getAll);
        
    }
    InitWebServiceRoutes(app);
    
    //other unregistered url will be redirected to 404 page, this line should always be the last line
    //app.get('*', errorpages.Error404);
};
module.exports = routes;