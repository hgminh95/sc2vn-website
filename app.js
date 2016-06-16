var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var sass = require('node-sass-middleware');
var multer = require('multer');
var i18n = require('i18n-2');

var config = require('./config/config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

i18n.expressBind(app, {
  // setup some locales - other locales default to vi silently
  locales: ['en', 'vi'],
  // set the default locale
  defaultLocale: 'en',
  // set the cookie name
  cookieName: 'locale'
});

// set up the middleware
app.use(function(req, res, next) {
  req.i18n.setLocaleFromCookie();
  next();
});

app.use(multer({dest: './tmp/'}).single('upload'));
app.use(multer({dest: './tmp/'}).any());

if (app.get('env') === 'development')
  app.use(sass({
    src: path.join(__dirname, 'app/resources/sass'),
    dest: path.join(__dirname, 'public/stylesheets'),
    includePaths: [path.join(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets'), path.join(__dirname, 'node_modules/tournament-drawer/css')],
    debug: false,
    prefix: '/stylesheets'
  }))

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'blizzard',
  saveUninitialized: true,
  resave: true
}));

require('./config/routes.api')(app);
require('./config/passport')(app);
require('./config/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

connect()
  .on('error', console.log)
  .on('disconnected', connect)

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.db, options).connection;
}

module.exports = app;
