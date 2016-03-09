'use strict';

var assign = require('object-assign');
var only = require('only');
var User = require('../models/users');

exports.load = function(req, res, next, id) {
  User.findById(id, function(err, user) {
    if (err) throw err;

    req.profile = user;
    if (!req.profile) return next(new Error('User not found'));
    next();
  });
}

exports.loadCurrentUser = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.current_user = req.user;
  }
  else {
    res.locals.current_user = {};
  }

  next();
}

exports.index = function(req, res) {
  res.render('users/index', {
    title: 'Users'
  });
}

exports.show = function(req, res) {
  var user = req.profile;
  res.render('users/show', {
    title: user.name,
    user: user
  });
}

exports.edit = function(req, res) {
  var user = req.profile;
  res.render('users/edit', {
    title: 'Editing ' + user.name,
    user: user
  });
}

exports.update = function(req, res) {
  var user = req.profile;

  assign(user, only(req.body, Users.fields()));
  user.save();

  res.redirect(user.getShowPath());
}

exports.rank = function(req, res) {
  User.allWithRanking(function(err, users) {
    if (err) throw err;

    res.render('users/rank', {
      users: users
    });
  });
}
