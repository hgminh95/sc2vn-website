'use strict';

var assign = require('object-assign');
var only = require('only');
var Match = require('../models/matches');
var async = require('async');
var settings = require('../../config/settings')

exports.load = function(req, res, next, id) {
  Match.findById(id, function(err, match) {
    if (err) return next(err);

    req.match = match;
    if (!req.match) return res.render('404');
    next();
  })
  .populate('player_1')
  .populate('player_2')
  .populate('tournament', 'name banner')
}

exports.index = function(req, res, next) {
  async.parallel({
    live: function(callback) { return Match.live(callback) },
    upcoming: function(callback) { return Match.upcoming(callback) }
  }, function(err, results) {
    console.log(results)
    res.render('matches/index', {
      title: 'Matches',
      live: results.live,
      upcoming: results.upcoming
    })
  })
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
    title: 'View matches',
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
