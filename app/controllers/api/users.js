'use strict';

var assign = require('object-assign');
var only = require('only');
var User = require('../../models/users');

exports.load = function(req, res, next, id) {
  User.findById(id, function(err, user) {
    if (err) return next(err);

    req.user = user;
    if (!req.user) return res.render('404');
    next();
  });
}

exports.create = function(req, res, next) {
  var user = new User(only(req.body, User.fields()));

  user.save(function(err, user) {
    if (err) return next(err);

    res.sendStatus(201);
  });
}

exports.index = function(req, res) {
  User.all(function(err, users) {
    res.json(users);
  });
}

exports.show = function(req, res) {
  res.json(req.user);
}

exports.update = function(req, res) {
  var user = req.user;

  assign(user, only(req.body, User.fields()));
  user.save();

  res.sendStatus(204);
}

exports.destroy = function(req, res) {
  req.user.remove();

  res.sendStatus(204);
}
