'use strict';

var assign = require('object-assign');
var only = require('only');
var Article = require('../../models/articles');

exports.load = function(req, res, next, id) {
  Article.findById(id, function(err, article) {
    if (err) next(err);

    req.article = article;
    if (!req.article) return next(new Error('Article not found'));
    next();
  });
}

exports.create = function(req, res) {
  res.sendStatus(201);
}

exports.index = function(req, res) {
  Article.all(function(err, articles) {
    res.json(articles.map(article => article._doc));
  });
}

exports.show = function(req, res) {
  res.json(req.article._doc);
}

exports.update = function(req, res) {
  var article = req.article;

  assign(article, only(req.body, 'title content'));
  article.save();

  res.sendStatus(204);
}

exports.destroy = function(req, res) {
  req.article.remove();

  res.sendStatus(204);
}
