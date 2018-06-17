var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var consumptionRouter = require('./routes/consumption.route');
var siteRouter = require('./routes/site.route');
var csvDumper = require('./services/csvDumper');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(consumptionRouter);
app.use(siteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url).then(() => {
  console.log("Successfully connected to the database");
  mongoose.connection.db.listCollections({name: 'consumptions'}).next(function(err, collinfo) {
    if (!collinfo) {
      var dump = new csvDumper();
      dump.dumpFolder('csv/');
    }
  });

}).catch(err => {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

// listen for requests
app.listen(dbConfig.apiPort, () => {
  console.log("Server is listening on port 4000");
});

module.exports = app;
