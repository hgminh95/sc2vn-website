'use strict';

var assign = require('object-assign');
var only = require('only');
var Tournament = require('../models/tournaments');

exports.load = function(req, res, next, id) {
  Tournament.findById(id, function(err, tournament) {
    if (err) next(err);
    
    req.tournament = tournament;
    if (!req.tournament) return next(new Error('Tournament not found'));
    next();
  });
}

exports.index = function(req, res) {
  Tournament.all(function(err, tournaments) {
    if (err) next(err);
    
    res.render('tournaments/index', {
      tournaments: tournaments.map(tournament => tournament.to_json())
    });
  });
}

exports.new = function(req, res) {
  res.render('tournaments/new');
}

exports.create = function(req, res) {
  var tournament = new Tournament(only(req.body, 'name sections'));
  tournament.save(function(err) {
    if (err) next(err);
    
    res.redirect_to(tournament.to_link());
  });
}

exports.show = function(req, res) {
  res.render('tournaments/show', {
    tournament: req.tournament.to_json()
  });
}

exports.edit = function(req, res) {
  res.render('tournament/edit', {
    tournament: req.tournament.to_json()
  });
}

exports.update = function(req, res) {
  var tournament = req.tournament;
  
  assign(tournament, only(req.body, 'name sections'));
  tournament.save();
  
  res.redirect_to(tournament.to_link());
}

exports.destroy = function(req, res) {
  req.tournament.remove();
  
  res.redirect_to('tournaments');
}