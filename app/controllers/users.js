'use strict';

var assign = require('object-assign');
var only = require('only');
var User = require('../models/users');
var settings = require('../../config/settings')
var userMailer = require('../mailer/user_mailer')

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

exports.register = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users');
  }

  res.render('users/register', {
    title: 'Register'
  });
}

exports.login = function(req, res) {
  res.render('users/login', {
    title: 'Login'
  });
}

exports.create = function(req, res, next) {
  var user = new User();
  assign(user, only(req.body, User.createFields()));
  user.confirm_token = User.generateConfirmToken()

  user.save(function(err, user) {
    if (err) return next(err);
    userMailer.sendConfirmEmail(user, function(err, info) {
      if (err) return console.log(err);
      console.log(info.response)
    })
    res.redirect('/users/login');
  });
}

exports.index = function(req, res) {
  res.redirect('/users/rank')
}

exports.show = function(req, res) {
  var user = req.profile;
  res.render('users/show', {
    title: user.name,
    user: user,
    matches_data: user.getChartData()
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

  assign(user, only(req.body, User.fields()));
  user.save();

  res.redirect(user.getShowPath());
}

exports.recalculateStatistics = function(req, res) {
  User.all(function(err, users) {
    users.forEach(function(user) {
      user.recalculateStatistics(function(err) {
        if (err) throw err
      })
    })

    res.sendStatus(200)
  })
}

exports.rank = function(req, res, next) {
  User.allWithRanking(function(err, users) {
    if (err) return next(err)

    res.locals.breadcrumbs.push({
      name: 'Rank',
      address: '/users/rank'
    })

    res.render('users/rank', {
      title: 'Ranking',
      users: users
    })
  })
}

exports.resendConfirmEmail = function (req, res, next) {
  userMailer.sendConfirmEmail(req.profile, function (err, info) {
    if (err) return next(err)
    console.log(info.response)
    res.sendStatus(200)
  })
}

exports.confirm = function(req, res, next) {
  var user = req.profile
  if (user.confirm_token != req.params.confirm_token) return next(new Error('Confirm token invalid'))
  user.confirmed_at = new Date()
  user.save(function(err, user) {
    if (err) return next(err)
    res.redirect('/')
  })
}
