// app/routes.js

const path = require('path');
const morgan = require('morgan');

const User = require('./models/users');


module.exports = function(app, passport) {

     // =====================================
     // HOME PAGE (with login links) ========
     // =====================================

     // Always return the main index.html, so react-router render the route in the client
     app.get('/', (req, res) => {
       res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
     });


     // =====================================
     // LOGIN ===============================
     // =====================================

     //templates with ejs file after npm install ejs
     app.set('view engine', 'ejs');

     // show the login form
     // .render allows for the "injection" of flash messages
     app.get('/login', function(req, res) {

          res.render('login', { message: req.flash('loginMessage') });

          //Orginally loads static html file
         //res.sendFile(path.join(__dirname, '../views', 'login.html'));

     });



     // process the login form
     app.post('/login', passport.authenticate('local-login', {
          successRedirect: '/bloom', // redirect to the secure profile section
          failureRedirect: '/', // redirect back to the signup page if there is an error
          //failureMessage: "Invalid username or password",
          failureFlash: true // allow flash messages


     }));

     // =====================================
     // SIGNUP ==============================
     // =====================================

     // process the signup form
     app.post('/signup',
     passport.authenticate('local-signup', {
          successRedirect: '/bloom', // redirect to the secure profile section
          failureRedirect: '/', // redirect back to the signup page if there is an error
          failureFlash: true // allow flash messages
     }),
     (req,res) =>{
          res.json;
     }
     );


     // =====================================
     // Grabs User Info ========
     // =====================================

     app.get('/users', (req, res) => {
       return User
         .find()
         .exec()
         .then(users => res.json(users.map(user => user.apiRepr())))
         .catch(err => console.log(err) && res.status(500).json({message: 'Internal server error'}));
     });


     // =====================================
     // LOGOUT ==============================
     // =====================================
     app.get('/logout', function(req, res) {
          console.log("Logging off");
          req.logout();
          res.redirect('/');
     });


     // =====================================
     // Bloom Section ===================
     // =====================================



};


// route middleware to make sure
function isLoggedIn(req, res, next) {

     // if user is authenticated in the session, carry on
     if (req.isAuthenticated())
          return next();

     // if they aren't redirect them to the home page
     res.redirect('/');
}
