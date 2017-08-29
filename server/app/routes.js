// app/routes.js

const path = require('path');
const morgan = require('morgan');


const User = require('./models/users');
const {Bloom} = require('./models/bloom');



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
     /*
     app.post('/login', passport.authenticate('local-login', {
          successRedirect: '/bloom', // redirect to the secure profile section
          failureRedirect: '/', // redirect back to the signup page if there is an error
          //failureMessage: "Invalid username or password",
          failureFlash: true // allow flash messages

     }));
     */

     app.post('/login', function(req, res, next) {
          passport.authenticate('local', function(err, user, info) {
               if (err) {
                    return next(err); // will generate a 500 error
               }
               // Generate a JSON response reflecting authentication status
               if (! user) {
                    return res.send(401,{ success : false, message : 'authentication failed' });
               }
              req.login(user, function(err){
                if(err){
                  return next(err);
                }
                return res.send({ success : true, message : 'authentication succeeded' });
              });
            })(req, res, next);
     });

     // =====================================
     // SIGNUP ==============================
     // =====================================

     // process the signup form
     /*
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
     */

     app.post('/signup',
     function(req, res, next) {
          passport.authenticate('local-signup',
          function(err, user, info) {
             if (err) { return next(err); }
             req.logIn(user, function(err) {
                  if (err) { return next(err); }
                  return res.json({ success : true, message : 'Sign-up successful' });
             });
          })(req, res, next);
     });


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

     app.get('/bloom', (req, res) => {
          let user = req.user;
          let userid = user._id;
          console.log(user);
          console.log(userid);

          Bloom
               .find( {user_id: userid})
               .sort({
                    created: 1
               }) //sorts recent date first
               .exec()
               .then(entries => {
                    res.json(entries.map(entry => entry.apiRepr()));
               })
               .catch(err => {
                    console.error(err);
                    res.status(500).json({
                         error: 'something went terribly wrong'
                    });
               });
     });

     //NOTE: NEW grab all entries despite user
     app.get('/all', (req, res) => {
          Bloom
               .find( )
               .sort({
                    created: 1
               }) //sorts recent date first
               .exec()
               .then(entries => {
                    res.json(entries.map(entry => entry.apiRepr()));
               })
               .catch(err => {
                    console.error(err);
                    res.status(500).json({
                         error: 'something went terribly wrong'
                    });
               });
     });


       //grabs pre-existing entry JSON data
       app.get('/:id/json', (req, res) => {
           Bloom
                .findById(req.params.id)
                .exec()
                .then(entry => res.json(entry.apiRepr()))
                .catch(err => {
                     console.error(err);
                     res.status(500).json({
                          error: 'something went horribly awry'
                     });
                });
      });




};


// route middleware to make sure
function isLoggedIn(req, res, next) {

     // if user is authenticated in the session, carry on
     if (req.isAuthenticated())
          return next();

     // if they aren't redirect them to the home page
     res.redirect('/');
}
