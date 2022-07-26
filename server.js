var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
const methodOverride = require('method-override');

// Load the secrets in the .env module
require('dotenv').config();
// Connect to our database (This line of code must be AFTER the above - .env)
require('./config/database');
// Configure passport
require('./config/passport');

var indexRouter = require('./routes/index');
var patternsRouter = require('./routes/patterns');
var mypatternsRouter = require('./routes/mypatterns');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/patterns', patternsRouter);
app.use('/mypatterns', mypatternsRouter);

// The starts with path for a related-resource,
// comments, varies, thus we cannot specify
// a starts with path
// app.use('/', isLoggedIn, commentsRouter);
// app.use('/', isLoggedIn, performersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
