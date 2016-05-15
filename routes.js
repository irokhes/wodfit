//Imports
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
        app.route('/api/wod/:id?').get(wodController.getAll).post(wodController.create).put(wodController.update);
        app.route('/api/wod/detail/:id').get(wodController.get);
        
        app.route('/api/exercise/').get(exerciseController.getAll);
        app.route('/api/maxrep/').get(maxRepController.getAll);
        
    }
    InitWebServiceRoutes(app);
    
    //other unregistered url will be redirected to 404 page, this line should always be the last line
    //app.get('*', errorpages.Error404);
};
module.exports = routes;