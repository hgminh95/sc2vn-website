'uses strict';

var assign = require('object-assign');
var only = require('only');
var Tournament = require('../../models/tournaments');

exports.load = function(req, res, next, id) {
  Tournament.findById(id, function(err, tournament) {
    if (err) next(err);
    else {
      req.tournament = tournament;
      if (!req.tournament) return res.render('404');
      next();
    }
  });
}

exports.index = function(req, res) {
  Tournament.all(function(err, tournaments) {
    res.json(tournaments);
  });
}

exports.show = function(req, res) {
  res.json(req.tournament);
}

exports.create = function(req, res) {
  var tournament = new Tournament(only(req.body, Tournament.fields()));
  tournament.save(function(err) {
    if (err)
      res.sendStatus(406);
    else
      res.sendStatus(201);
  });
}

exports.update = function(req, res) {
  var tournament = req.tournament;

  assign(tournament, only(req.body, Tournament.fields()));
  tournament.save();

  res.sendStatus(204);
}

exports.destroy = function(req, res) {
  req.tournament.remove();

  res.sendStatus(204);
}
