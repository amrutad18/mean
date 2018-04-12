

var express = require('express');
var path = require('path');
var app = express()
var yVal = 0;
var server = require('http').createServer(app);
var io = require('socket.io').listen(app.listen(8000));
var Chart = require('chartjs')
app.use(express.static('public'))

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var configDB = require('./config/database.js');

var bodyParser = require('body-parser');
require('mongoose').Types;
// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
var logger = require('morgan');
app.use(logger('dev')); // log every request to the console
var cookieParser = require('cookie-parser');
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs'); // set up ejs for templating
//app.set('view engine', 'html');

var session = require('express-session');
// required for passport
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
var path = require('path');
//app.set('views', path.join(__dirname, '/views'));
app.set('views', __dirname + '/views')
//app.set('views', path.join(__dirname, '/public'));
path.join(__dirname, 'path/to/views')

// routes ======================================================================
a = require('./app/routes.js')(app, passport, io); // load our routes and pass in our app and fully configured passport
var i = 0;
