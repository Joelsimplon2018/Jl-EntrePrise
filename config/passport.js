
'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel= require('../models/user.model');

// Setup work and export for the JWT passport strategy
// check if in user token the 'secretOrKey' match. Then go check if user exist in db. Finally, send ok response and 'open' the route (routes.js).
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        secretOrKey: "chut"
    };

    passport.use(new JwtStrategy(opts, (jwt_payload, callback) => {
        console.log("jwt_payload : ", jwt_payload);
        // usually this would be a database call:
        UserModel.findUser({email: jwt_payload.email}, (res) => {
            const user = res;
            delete user.password;
            callback(null, user);
        }, (err) => {
            return callback(err, false);
        });
       
    }));
};