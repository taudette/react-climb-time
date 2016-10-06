// Babel ES6/JSX Compiler
/* eslint-disable vars-on-top, no-var, prefer-arrow-callback, func-names, prefer-template, space-before-function-paren */
require('babel-register');

var swig = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Climber = require('./models/climber');
var config = require('./config');
var app = express();
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var fs = require('fs');

mongoose.connect('mongodb://localhost/react-climb-time');
mongoose.connection.on('error', function () {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * GET /api/climbers
 * gets climbers to the database.
 */
app.get('/api/climbers', function(req, res) {
  fs.readFile('climbers.json', function(err, data) {
    res.send(data);
  });
});

/**
 * POST /api/climbers
 * Adds new climber to the database.
 */
app.post('/api/climbers', function(req, res) {
  fs.readFile('climbers.json', function(err, data) {
    var climbers = JSON.parse(data);
    climbers.push(req.body);
    fs.writeFile('climbers.json', JSON.stringify(climbers, null, 4), function(err) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache');
      res.send(JSON.stringify(climbers));
    });
  });
});

/**
 * DELETE /api/climbers
 * Adds new climber to the database.
 */
app.delete('/api/climbers', function(req, res) {
  var name = req.body.name;
  fs.readFile('climbers.json', function(err, data) {
    var climbers = JSON.parse(data);
    var shortClimbers = climbers.map(function(name){
      var obj = {}
     // TODO: setting removing climber that matches name from array
    })
    fs.writeFile('climbers.json', JSON.stringify(climbers, null, 4), function(err) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache');
      res.send(JSON.stringify(climbers));
    });
  });
});

/**
 * GET /api/climbers/count
 * Returns the total number of climbers.
 */
app.get('/api/climbers/count', function(req, res, next) {
  Climber.count({}, function(err, count) {
    if (err) return next(err);
    res.send({ count: count });
  });
});

/**
 * GET /api/climbers/search
 * Looks up a character by name. (case-insensitive)
 */
app.get('/api/climbers/search', function(req, res, next) {
  var climberName = new RegExp(req.query.name, 'i');

  Climber.findOne({ name: climberName }, function(err, climber) {
    if (err) return next(err);

    if (!climber) {
      return res.status(404).send({ message: 'Climber not found.' });
    }

    res.send(climber);
  });
});


// will be executed on every request to the server except those handled by api endpoints
app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found');
    }
  });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function (socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function () {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});