/*
 * @file - entry point for Express apps
 */

var vriFn = require('./helpers/function');

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var _gs = require('./settings');
var flashify = require('./middlewares/flashify');
var views = require('./middlewares/views');
var _500 = require('./middlewares/500');
var path = require('path');

var allowInsecureHTTP = false


var app = express();
var router = express.Router();

app.set('views', path.join(__dirname,"views"));
app.set('view engine', 'ejs');
app.set('_gs', _gs);
app.set('view cache', false);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());


app.use(session({
  secret:'VtJskZe6Zp6e}U,%',
  resave: true,
  saveUninitialized:true
}));


app.use(function(req, res, next) {
  if (req.session.session === undefined) {
    req.session.session = {};
  }
  // comment out and set via authentication function to enable.
  req.session.authenticated = true;
  next();
});


app.use(views);
app.use(router);
app.use(express.static('public'));


//make available helper functions to views
app.locals.vriFn = vriFn;
app.locals._ = require('underscore');

// Pass the Express instance to the routes module
var routes = require('./routes/routes')(app);

var port = process.env.PORT || 1338;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});


