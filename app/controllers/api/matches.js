'uses strict';

var assign = require('object-assign');
var only = require('only');
var Match = require('../../models/matches');

exports.load = function(req, res, next, id) {
  Match.findById(id, function(err, match) {
    if (err) next(err);
    else {
      req.match = match;
      if (!req.match) return next(new Error('Match not found'));
      next();
    }
  });
}

exports.index = function(req, res) {
  Match.all(function(err, matchs) {
    res.json(matchs.map(match => match._doc));
  });
}

exports.show = function(req, res) {
  res.json(req.match._doc);
}

exports.create = function(req, res) {
  var match = new Match(only(req.body, Match.fields()));
  match.save(function(err) {
    if (err)
      res.sendStatus(406);
    else
      res.sendStatus(201);
  });
}

exports.update = function(req, res) {
  var match = req.match;

  assign(match, only(req.body, Match.fields()));
  match.save();

  res.sendStatus(204);
}

exports.destroy = function(req, res) {
  req.match.remove();

  res.sendStatus(204);
}
