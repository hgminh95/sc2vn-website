'uses strict';

var assign = require('object-assign');
var only = require('only');
var Match = require('../../models/matches');

exports.load = function(req, res, next, id) {
  Match.findById(id, function(err, match) {
    if (err) next(err);
    else {
      req.match = match;
      if (!req.match) return res.render('404');
      next();
    }
  });
}

exports.index = function(req, res) {
  Match.all(function(err, matches) {
    res.json(matches);
  });
}

exports.show = function(req, res) {
  res.json(req.match);
}

exports.create = function(req, res) {
  var match = new Match(only(req.body, Match.fields()));
  match.save(function(err) {
    if (err) return res.sendStatus(406);

    res.sendStatus(201);
  });
}

exports.update = function(req, res) {
  var match = req.match;

  assign(match, only(req.body, Match.fields()));
  match.save(function(err) {
    if (err) return res.sendStatus(406)

    res.sendStatus(201)
  });
}

exports.destroy = function(req, res) {
  req.match.remove(function(err) {
    if (err) return res.sendStatus(406)

    res.sendStatus(204)
  })
}
