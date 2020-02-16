'use strict' 
// Import dependencies
var passport = require('passport');
var express = require('express');
var jwt = require('jsonwebtoken');
// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });


// Export the routes for our app to use
module.exports = function (app) {
    // API Route Section

    // Initialize passport for use
    app.use(passport.initialize());

    // Bring in defined Passport Strategy
    require('./config/passport')(passport);

    // Create API group routes

    var apiRoutes = express.Router();
    var prestataireRoutes = require('./controller/prestat.controller');
    var userRoutes = require('./controller/user.controller');
    var missionRoutes = require('./controller/mission.controller')

    // Set url for API group routes
    app.use('/', apiRoutes);
     app.use("/prestataire", prestataireRoutes);
     app.use("/mission", missionRoutes);
     app.use("/users", userRoutes);

    // //Protected authenticated routes with JWT
    // apiRoutes.get('/coucou', requireAuth, (request, response) => {
    //     // response.send('It worked User id is: ' + request.user.id_user + ', Email id is: ' + request.user.email + ' and type is : ' + request.user.status + '.');
    //     response.send("ok " + request.user.id_user);
    // });






    
    // PASSPORT : fonctionne mais côté back seulement ! (postman ok)


    //Check to make sure header is not undefined, if so, return Forbidden (403)
    const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
    }

    apiRoutes.get('/bienvenue', checkToken, (req, res) => {
        //verify the JWT token generated for the user
        jwt.verify(req.token, 'chut', (err, authorizedData) => {
            if(err){
                //If error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                //If token is successfully verified, we can send the autorized data 
                res.json({
                    message: 'Successful log in',
                    authorizedData
                });
                console.log('SUCCESS: Connected to protected route');
            }
        })
    });
    

  
    

};