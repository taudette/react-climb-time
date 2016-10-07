/* eslint-disable vars-on-top, no-var, prefer-arrow-callback, func-names, prefer-template, space-before-function-paren */

var express = require('express');
var app = express();
var fs = require('fs');

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
    fs.writeFile('climbers.json', JSON.stringify(climbers, null, 4), function() {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache');
      res.send(JSON.stringify(climbers));
    });
  });
});

/**
 * DELETE /api/climbers
 * Deletes climber from the database.
 */
app.delete('/api/climbers', function(req, res) {
  fs.readFile('climbers.json', function(err, data) {
    var climbers = JSON.parse(data);
    for (var i = 0; i < climbers.length; i++){
      if (climbers[i].name == req.body.name) {
        climbers.splice(i, 1);
      }
    }
    fs.writeFile('climbers.json', JSON.stringify(climbers, null, 4), function() {
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
app.get('/api/climbers/count', function(req, res) {
  fs.readFile('climbers.json', function(err, data) {
    var climbers = JSON.parse(data);
    var count = climbers.length;
    res.send({ count: count });
  });
});

/**
 * GET /api/climbers/search
 * Looks up a climber by name. (case-insensitive)
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

module.exports = app;