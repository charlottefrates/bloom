// config/passport.js
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

// load all the things we need
const LocalStrategy = require('passport-local').Strategy;

// load up the user model
const User = require('../app/models/users');


// expose this function to our app using module.exports
module.exports = function(passport) {
     // =========================================================================
     // passport session setup ==================================================
     // =========================================================================
     // required for persistent login sessions
     // passport needs ability to serialize and unserialize users out of session

     // used to serialize the user for the session
     passport.serializeUser(function(user, done) {
          //done(null, user.id);
          done(null, user.id);

     });

     // used to deserialize the user
     passport.deserializeUser(function(id, done) {
          User.findById(id, function(err, user) {
               done(err, user);
          });
     });

     // =========================================================================
     // LOCAL SIGNUP ============================================================
     // =========================================================================
     // we are using named strategies since we have one for login and one for signup
     // by default, if there was no name, it would just be called 'local'

     passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'local.username': username }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, { message: 'That username is already taken. Choose a different one.' });
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser            = new User();

                        // set the user's local credentials
                        newUser.local.username = username;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.lastName = req.body.lastName;
                        newUser.local.firstName = req.body.firstName;

                        console.log(req.body.username);
                        console.log(req.body.lastName);
                        console.log(req.body.firstName);

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });
        }));



     // =========================================================================
     // LOCAL LOGIN =============================================================
     // =========================================================================
     // we are using named strategies since we have one for login and one for signup
     // by default, if there was no name, it would just be called 'local'

     passport.use('local-login', new LocalStrategy({
               // by default, local strategy uses username and password, we will override with email
               usernameField: 'username',
               passwordField: 'password',
               passReqToCallback: true // allows us to pass back the entire request to the callback
          },
          function(req, username, password, done) { // callback with email and password from our form

               // find a user whose email is the same as the forms email
               // we are checking to see if the user trying to login already exists
               User.findOne({
                    'local.username': username
               }, function(err, user) {
                    // if there are any errors, return the error before anything else
                    if (err)
                         return done(err);

                    // if no user is found, return the message
                    if (!user)
                         return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                    // if the user is found but the password is wrong
                    if (!user.validatePassword(password))
                         return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata



                    //req.session.user = user.local.username;
                    req.session.firstName = user.local.firstName;
                    req.session.lastName = user.local.lastName;
                    console.log(req);
                    // all is well, return successful user
                    return done(null, user);
               });

          }));


};
