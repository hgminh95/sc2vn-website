'use strict';

var assign = require('object-assign');
var only = require('only');
var Match = require('../models/matches');

exports.load = function(req, res, next, id) {
  Match.findById(id, function(err, match) {
    if (err) return next(err);

    req.match = match;
    if (!req.match) return res.render('404');
    next();
  });
}

exports.index = function(req, res, next) {
  Match.all(function(err, matches) {
    if (err) return next(err);

    res.render('matches/index', {
      matches: matches
    });
  });
}

exports.new = function(req, res) {
  res.render('matches/new', {
    match: new Match()
  });
}

exports.create = function(req, res, next) {
  var match = new Match(only(req.body, Match.fields()));
  match.save(function(err) {
    if (err) return next(err);

    res.redirect(match.getShowPath());
  });
}

exports.show = function(req, res) {
  res.render('matches/show', {
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

  res.redirect('/matches');
}
