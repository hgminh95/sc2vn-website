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

exports.new = function(req, res) {
  var article = new Article();
  
  res.render('articles/new', {
    article: article._doc,
    title: 'New article'
  });
}

exports.create = function(req, res, next) {
  var article = new Article();
  assign(article, only(req.body, 'title content'));
  article.save(function(err) {
    if(err) return next(err);
    res.redirect(article.to_link());
  });
}

exports.index = function(req, res) {
  Article.all(function(err, articles) {
    if (err) next(err);
    res.render('articles/index', {
      title: 'Articles',
      articles: articles.map(article => article._doc)
    });
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
