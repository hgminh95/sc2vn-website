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
