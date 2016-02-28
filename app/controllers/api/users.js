'use strict';

var assign = require('object-assign');
var only = require('only');
var User = require('../../models/users');

exports.load = function(req, res, next, id) {
  User.findById(id, function(err, user) {
    if (err) throw err;
    
    req.user = user;
    if (!req.user) return next(new Error('User not found'));
    next();
  });
}

exports.create = function(req, res) {
  res.sendStatus(201);
}

exports.index = function(req, res) {
  User.all(function(err, users) {
    res.json(users.map(user => user._doc));
  });
} 

exports.show = function(req, res) {
  res.json(req.user._doc);
}

exports.update = function(req, res) {
  var user = req.user;
  
  assign(user, only(req.body, 'name'));
  user.save();
  
  res.sendStatus(204);
}

exports.destroy = function(req, res) {
  req.user.remove();
  
  res.sendStatus(204);
}