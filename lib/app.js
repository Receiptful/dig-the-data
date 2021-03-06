'use strict';

const express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  config = require('./config'),
  nunjucksEnv = require('./nunjucks');

const staticOptions = {
  maxAge: config.staticMaxAge
};

const app = express();
app.set('view engine', 'html');
nunjucksEnv.express(app);

app.use(favicon(path.join(__dirname,'..', 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public'), staticOptions));

app.get('/', (req, res) => {
  res.render('index', { title: 'Dig the Data' });
});

app.get('/anniversary', (req, res) => {
  res.render('anniversary', { title: 'Dig the Data -- Anniversary Edition' });
});

app.get('/warm', (req, res) => {
  res.render('warm', { title: 'Dig the Data -- Warm' });
});

app.get('/storegrader', (req, res) => {
  res.render('storegrader', { title: 'Dig the Data -- StoreGrader' });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { title: res.locals.message });
});

module.exports = app;
