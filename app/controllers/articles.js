'use strict';

var assign = require('object-assign');
var only = require('only');
var Article = require('../models/articles');

exports.load = function(req, res, next, id) {
  Article.findById(id, function(err, article) {
    if (err) next(err);

    req.article = article;
    if (!req.article) return next(new Error('Article not found'));
    next();
  });
}

exports.create = function(req, res) {
  var article = new Article({
    title: req.title,
    content: req.content,
    author: req.author
  });
  article.save(function(err) {
    if(err) next(err);
    res.redirect(article.to_link());
  });
}

exports.index = function(req, res) {
  res.render('articles/index', {
    title: 'Articles'
  });
}

exports.show = function(req, res) {
  var article = req.article;
  res.render('articles/show', {
    title: article.title,
    article: article._doc
  })
}

exports.edit = function(req, res) {
  var article = req.article;
  res.render('articles/edit', {
    title: 'Editing ' + article.title,
    article: article._doc
  })
}

exports.update = function(req, res) {
  var article = req.article;

  assign(article, only(req.body, 'title content'));
  article.save();

  res.redirect(article.to_link());
}

exports.destroy = function(req, res) {
  req.article.remove();

  res.redirect('/articles');
}
