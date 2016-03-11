'use strict';

var assign = require('object-assign');
var only = require('only');
var Article = require('../../models/articles');

exports.load = function(req, res, next, id) {
  Article.findById(id, function(err, article) {
    if (err) next(err);

    req.article = article;
    if (!req.article) return res.render('404')
    next();
  });
}

exports.create = function(req, res) {
  var article = new Article(only(req.body, Article.fields()));
  console.log(req.body);
  article.save(function(err) {
    if (err) res.sendStatus(406);

    res.sendStatus(201);
  });
}

exports.index = function(req, res) {
  Article.all(function(err, articles) {
    res.json(articles);
  });
}

exports.show = function(req, res) {
  res.json(req.article);
}

exports.update = function(req, res) {
  var article = req.article;

  assign(article, only(req.body, Article.fields()));
  article.save();

  res.sendStatus(204);
}

exports.destroy = function(req, res) {
  req.article.remove();

  res.sendStatus(204);
}
