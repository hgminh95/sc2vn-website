'use strict';

var User = require('../models/users');

exports.checkNotification = function(req, res, next) {
  if (req.isAuthenticated()) {
    var notifications = req.user.notifications;
    var removed = [];
    for (var i = 0; i < notifications.length; i ++) {
      if (req.url == notifications[i].link) {
        removed.push(notifications[i]);
      }
    }
    User.findById(req.user._id, function(err, user) {
      if (err) next(err);
      user.removeNotifications(removed);
    });
  }
  next();
}

exports.cachePreviousPage = function(req, res, next) {
  var staticRoutes = [
    /^\/fonts/,
    /^\/javascripts/,
    /^\/stylesheets/,
    /^\/images/
  ]

  var irrelevantRoutes = [
    '/users/login',
    '/auth/bnet',
    '/auth/bnet/callback',
    '/language'
  ]

  if (req.method == 'GET') {
    for (var i = 0; i < staticRoutes.length; i ++) {
      if (staticRoutes[i].test(req.path)) return next()
    }
    for (var i = 0; i < irrelevantRoutes.length; i ++) {
      if (irrelevantRoutes[i] == req.path) return next()
    }
    req.session.returnTo = req.path
  }
  next()
}
