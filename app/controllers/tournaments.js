'use strict';

var assign = require('object-assign');
var only = require('only');
var Tournament = require('../models/tournaments');

exports.init = function(req, res, next) {
  res.locals.breadcrumbs.push({
    name: 'Tournaments',
    address: '/tournaments'
  })

  next()
}

exports.load = function(req, res, next, id) {
  Tournament.findById(id, function(err, tournament) {
    if (err) return next(err);

    req.tournament = tournament;
    if (!req.tournament) return res.render('404');

    res.locals.breadcrumbs.push({
      name: tournament.name,
      address: tournament.getShowPath()
    })
    next();
  });
}

exports.index = function(req, res, next) {
  Tournament.all(function(err, tournaments) {
    if (err) return next(err);

    res.render('tournaments/index', {
      title: 'Tournaments',
      tournaments: tournaments
    });
  });
}

exports.new = function(req, res) {
  res.render('tournaments/new', {
    tournament: new Tournament()
  });
}

exports.create = function(req, res, next) {
  var tournament = new Tournament(only(req.body, Tournament.fields()));
  tournament.save(function(err) {
    if (err) return next(err);

    res.redirect(tournament.getShowPath());
  });
}

exports.show = function(req, res) {
  res.render('tournaments/show', {
    title: req.tournament.name,
    tournament: req.tournament
  });
}

exports.edit = function(req, res) {
  res.render('tournaments/edit', {
    title: req.tournament.name,
    tournament: req.tournament
  });
}

exports.update = function(req, res) {
  var tournament = req.tournament;

  assign(tournament, only(req.body, Tournament.fields()));
  tournament.save(function(err) {
    if (err) return res.sendStatus(406)

    return res.json(req.body)
  })
}

exports.destroy = function(req, res) {
  req.tournament.remove();

  res.redirect('/tournaments');
}
