'use strict';

var assign = require('object-assign');
var only = require('only');
var Match = require('../models/matchs');

exports.load = function(req, res, next, id) {
  Match.findById(id, function(err, match) {
    if (err) next(err);

    req.match = match;
    if (!req.match) return next(new Error('Match not found'));
    next();
  });
}

exports.index = function(req, res) {
  Match.all(function(err, matchs) {
    if (err) next(err);

    res.render('matchs/index', {
      matchs: matchs
    });
  });
}

exports.new = function(req, res) {
  res.render('matchs/new', {
    match: new Match()
  });
}

exports.create = function(req, res) {
  var match = new Match(only(req.body, Match.fields()));
  match.save(function(err) {
    if (err) next(err);
    else {
      res.redirect(match.getShowPath());
    }
  });
}

exports.show = function(req, res) {
  res.render('matchs/show', {
    match: req.match
  });
}

exports.edit = function(req, res) {
  res.render('match/edit', {
    match: req.match
  });
}

exports.update = function(req, res) {
  var match = req.match;

  assign(match, only(req.body, Match.fields()));
  match.save();

  res.redirect(match.getShowPath());
}

exports.destroy = function(req, res) {
  req.match.remove();

  res.redirect('/matchs');
}
