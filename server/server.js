// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash    = require('connect-flash');

const session = require('express-session');
const configDB = require('./config/database.js');

const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const join = require('path').join;

// connect to our database
mongoose.connect(configDB.url, {
  useMongoClient: true
});

require('./config/passport')(passport); // pass passport for configuration


// Setup logger
app.use(morgan('common'));
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

app.use(session({ secret: 'bloom',resave: true,saveUninitialized: true})); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('superSecret', configDB.secret); // secret variable


//Enables CORS on Express JS for multi server use
//https://enable-cors.org/server_expressjs.html

//https://www.npmjs.com/package/cors
app.use(cors({credentials: true}));
//app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));


//routes
// load our routes and pass in our app and fully configured passport
require('./app/routes.js')(app, passport);

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../build/index.html'));
  });


module.exports = {app};
