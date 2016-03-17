'use strict';

var assign = require('object-assign');
var only = require('only');
var User = require('../models/users');

exports.load = function(req, res, next, id) {
  User.findById(id, function(err, user) {
    if (err) return next(err);

    req.profile = user;
    if (!req.profile) return res.render('404');
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

exports.login = function(req, res) {
  res.render('users/login', {
    title: 'Login'
  });
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

exports.rank = function(req, res, next) {
  User.allWithRanking(function(err, users) {
    if (err) return next(err);

    res.render('users/rank', {
      users: users
    });
  });
}
