'use strict';

var assign = require('object-assign');
var only = require('only');
var Match = require('../models/matches');
var User = require('../models/users');
var async = require('async');
var settings = require('../../config/settings')
var uploader = require('../uploaders/replay');

exports.init = function(req, res, next) {
  res.locals.breadcrumbs.push({
    name: 'Matches',
    address: '/matches'
  })

  next()
}

exports.load = function(req, res, next, id) {
  Match.findById(id, function(err, match) {
    if (err) return next(err);

    req.match = match;
    if (!req.match) return res.render('404');

    res.locals.breadcrumbs.push({
      name: 'Match ' + match._id,
      address: match.getShowPath()
    })

    next();
  })
  .populate('player_1')
  .populate('player_2')
  .populate('tournament', 'name banner')
}

exports.index = function(req, res, next) {
  async.parallel({
    upcomming: function(callback) {
      return Match.upcomming(callback)
    },
    live: function(callback) {
      return Match.live(callback)
    },
    past: function(callback) {
      return Match.past({
        perPage: settings.matches_per_page,
        page: req.params.page
      }, callback)
    }
  }, function(err, results) {
    console.log(results)

    res.render('matches/index', {
      title: 'Matches',
      live: results.live,
      upcomming: results.upcomming,
      past: results.past
    })
  })
}

exports.new = function(req, res) {
  User.all(function(err, users) {
    if (err) return next(err)

    res.render('matches/new', {
      match: new Match(),
      users: users
    });
  })
}

exports.create = function(req, res, next) {
  var match = new Match(only(req.body, Match.fields()));
<<<<<<< HEAD

=======
  match.addGames(req.body.gamesCount)
>>>>>>> c450137f5ee8e00732c496178ae6e0f6e2e17cc2

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
  res.render('matches/edit', {
    match: req.match
  });
}

exports.update = function(req, res) {
  var match = req.match;
<<<<<<< HEAD

  assign(match, only(req.body, Match.fields()));
  for(var i = 0 ; i < req.body.games.length(); i++){
    var game = req.body.games[i];
    var file = req.files[game._id]

    uploader.upload(game, file, function(match) {
      match.save(function(err, match) {
        if (err) return next(err);
      });
    });
  }

  match.save();
=======
  var gamesReq = {games: JSON.parse(req.body.games)}
  console.log(match)
  assign(match, only(gamesReq, Match.fields()));
  console.log(match)

  match.save(function(err, match) {
    if (err) {
      console.log(err)
      return err
    }
  });
>>>>>>> c450137f5ee8e00732c496178ae6e0f6e2e17cc2

  res.redirect(match.getShowPath());
}

exports.destroy = function(req, res) {
  req.match.remove();

  res.redirect('/matches');
}
