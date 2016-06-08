'use strict';

var assign = require('object-assign');
var only = require('only');
var async = require('async');

var Match = require('../models/matches');
var User = require('../models/users');
var Map = require('../models/maps');
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
  .populate('games.map')
  .populate('tournament', 'name banner')
}

exports.index = function(req, res, next) {
  async.parallel({
    upcomming: function(callback) {
      return Match.upcomming(callback)
    },
    past: function(callback) {
      return Match.past({
        perPage: settings.matches_per_page,
        page: req.params.page
      }, callback)
    }
  }, function(err, results) {
    res.render('matches/index', {
      title: 'Matches',
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
  match.addGames(req.body.gamesCount)
  match.save(function(err) {
    if (err) return next(err);

    res.redirect(match.getShowPath());
  });
}

exports.show = function(req, res) {
    if (req.accepts('text/javascript') && req.xhr) {
        res.type('application/javascript')

        res.render('matches/showjs', {
            match: req.match
        })
    }
    else if (req.accepts('html')) {
        res.render('matches/show', {
            title: 'View matches',
            match: req.match
        })
    }
}

exports.edit = function(req, res) {
    Map.all(function(err, maps) {
        if (err) return next(err)

        if (req.accepts('text/javascript') && req.xhr) {
            User.all(function(err, users) {
                res.type('application/javascript')

                res.render('matches/editjs', {
                    match: req.match,
                    maps: maps,
                    users: users
                })
            })
        }
        else if (req.accepts('html')) {
            console.log("Render html")
            res.render('matches/edit', {
                title: 'Edit match',
                match: req.match,
                maps: maps,
                users: users
            })
        }
    })
}

exports.update = function(req, res) {
  var match = req.match;

  var gamesReq = {games: JSON.parse(req.body.games), date: req.body.date}
  console.log(gamesReq)
  assign(match, only(gamesReq, Match.fields()));
  console.log(gamesReq.games.length)
  if(req.files != null){
    for(var i = 0 ; i < gamesReq.games.length; i++){
    var game = gamesReq.games[i]
    console.log(req.files)
    if(req.files[i] != null){
      var file = req.files[i]
      uploader.upload(game, file, function(match) {
        match.save(function(err, match) {
          if (err) return next(err);
        });
      });
    }
  }
  }

  match.save(function(err, match) {
    if (err) {
      console.log(err)
      return err
    }
  });

  res.redirect(match.getShowPath());
}

exports.destroy = function(req, res) {
  req.match.remove();

  res.redirect('/matches');
}
