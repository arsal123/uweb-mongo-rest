'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('user'),
    localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    console.log('-------------------reaching here?---------------');
    // used to serialize the user for the session
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    passport.use('local-login', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true 
    }, 
    function(req, username, password, done){
        User.findOne({ 'username': username}, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, {message: 'no user found'});

            if(!user.validPassword(password))
                return done(null, false, {message: "password was wrong"});

            return done(null, user);
        });

    }));
};
