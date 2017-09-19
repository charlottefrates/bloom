// app/routes.js

const path = require('path');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');



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
     // SIGNUP ==============================
     // =====================================
     //NOTE CREATES ACCESS TOKIN!

     app.post('/signup',
     function(req, res, next) {
          console.log('check');
          passport.authenticate('local-signup',
          function(err, user, info) {
               console.log(user);
             if (err) { return next(err); }
             req.logIn(user, function(err) {
                 console.log(err);
                  if (err) {
                    return next(err);
               }else {
                 // if user is found and password is right
                 // create a token
                 let token = jwt.sign(user, app.get('superSecret'), {
                   expiresIn : 60*60*24 // expires in 24 hours
                 });

                 // return the information including token as JSON
                 return res.json({
                   success: true,
                   message: 'Enjoy your token!',
                   token: token,
                   user: user.local.username
                 });
            }
                  //return res.json({ success : true, message : 'Sign-up successful' });
             });
          })(req, res, next);
     });


     // =====================================
     // LOGIN ===============================
     // =====================================
     //NOTE CREATES ACCESS TOKIN!

     app.post('/login', function(req, res, next) {
          console.log('check');
          passport.authenticate('local-login', function(err, user, info) {
               if (err) {
                    return next(err); // will generate a 500 error
               }
               // Generate a JSON response reflecting authentication status
               if (! user) {
                    return res.send(401,{ success : false, message : 'authentication failed'});
               }
              req.login(user, function(err){
                if(err){
                  return next(err);
             }else {
                     console.log('check');
                  // if user is found and password is right
                  // create a token
                  let token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn : 60*60*24 // expires in 24 hours
                  });

                  // return the information including token as JSON
                   return res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    user: user.local.username
                  });
             }

                //return res.send({ success : true, message : 'authentication succeeded' });

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
     // Bloom Section ===================
     // =====================================

     app.get('/bloom', (req, res) => {
          //NOTE: Grabbing user info through custom user header
          let user = req.headers.users;
          console.log(req.headers);
          Bloom
               .find({user_id: user})
               .sort({
                    created: 1
               }) //sorts recent date first
               .exec()
               .then(entries => {
                    console.log(entries);
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
          console.log(req);
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


      app.post('/new', (req, res) => {
          console.log(JSON.stringify(req.headers));
          const requiredFields = ['zones', 'days','gal_min', 'min', 'projected','user'];
          for (let i = 0; i < requiredFields.length; i++) {
               const field = requiredFields[i];
               if (!(field in req.body)) {
                    const message = `Missing \`${field}\` in request body`
                    console.error(message);
                    return res.status(400).send(message);
               }
          }
          Bloom
               .create({
                    zones: req.body.zones,
                    days: req.body.days,
                    gal_min: req.body.gal_min,
                    min: req.body.min,
                    projected: req.body.projected,
                    created: req.body.created,
                    user_id:req.body.user
               })
               .then(bloomEntry => res.status(201).json(bloomEntry.apiRepr()))
               .catch(err => {
                    console.error(err);
                    res.status(500).json({
                         error: 'Something went wrong'
                    });
               });
     });




     app.delete('/delete/:id', (req, res) => {
          Bloom
               .findByIdAndRemove(req.params.id)
               .exec()
               .then(() => {
                    res.status(204).json({
                                  message: 'success'
                             });
                        })
               .catch(err => {
                     console.error(err);
                             res.status(500).json({
                                  error: 'something went terribly wrong'
                             });
                        });
              });

              // =====================================
              // Bloom Section- TEST ROUTES===========
              // =====================================

              app.post('/new/test', (req, res) => {
                  console.log(JSON.stringify(req.headers));
                  const requiredFields = ['zones', 'days', 'gal_min', 'min', 'projected','user'];
                  for (let i = 0; i < requiredFields.length; i++) {
                       const field = requiredFields[i];
                       if (!(field in req.body)) {
                            const message = `Missing \`${field}\` in request body`
                            console.error(message);
                            return res.status(400).send(message);
                       }
                  }
                  Bloom
                       .create({
                            zones: req.body.zones,
                            days: req.body.days,
                            gal_min: req.body.gal_min,
                            min: req.body.min,
                            projected: req.body.projected,
                            created: req.body.created,
                            user_id:req.body.user
                       })
                       .then(bloomEntry => res.status(201).json(bloomEntry.apiRepr()))
                       .catch(err => {
                            console.error(err);
                            res.status(500).json({
                                 error: 'Something went wrong'
                            });
                       });
              });



              app.delete('/delete/test/:id', (req, res) => {
                   Bloom
                        .findByIdAndRemove(req.params.id)
                        .exec()
                        .then(() => {
                             res.status(204).json({
                                           message: 'success'
                                      });
                                 })
                        .catch(err => {
                              console.error(err);
                                      res.status(500).json({
                                           error: 'something went terribly wrong'
                                      });
                                 });
                       });

};
