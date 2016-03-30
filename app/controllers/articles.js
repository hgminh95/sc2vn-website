'use strict';

var assign = require('object-assign');
var only = require('only');
var uploader = require('../uploaders/thumbnails');
var Article = require('../models/articles');
var settings = require('../../config/settings')

exports.init = function(req, res, next) {
  res.locals.breadcrumbs.push({
    name: 'Articles',
    address: '/articles/'
  })

  next()
}

exports.load = function(req, res, next, id) {
  Article.findById(id, function(err, article) {
    if (err) return next(err);

    req.article = article;
    if (!req.article) return res.render('404');
    next();
  }).populate('author');
}

exports.new = function(req, res) {
  var article = new Article();

  res.render('articles/new', {
    article: article,
    title: 'New article'
  });
}

exports.create = function(req, res, next) {
  var article = new Article();
  assign(article, only(req.body, Article.fields()));

  if (!req.user) return next(new Error('Not authenticated'));
  article.author = req.user._id;

  uploader.upload(article, req.file, function(article) {
    article.save(function(err, article) {
      if (err) return next(err);
      res.redirect(article.getShowPath());
    });
  });
}

exports.index = function(req, res, next) {
  req.query.page = req.query.page || 0

  Article.list({ perPage: settings.articles_per_page, page: req.query.page }, function(err, articles) {
    if (err) return next(err);

    res.render('articles/index', {
      title: 'Articles',
      articles: articles,
      prevPage: req.query.page - 1,
      nextPage: articles.length == settings.articles_per_page ? req.query.page + 1 : -1
    });
  });
}

exports.show = function(req, res) {
  var article = req.article;

  res.render('articles/show', {
    title: article.title,
    article: article
  })
}

exports.edit = function(req, res) {
  var article = req.article;

  res.render('articles/edit', {
    title: 'Editing ' + article.title,
    article: article
  })
}

exports.update = function(req, res, next) {
  var article = req.article;

  assign(article, only(req.body, Article.fields()));

  uploader.upload(article, req.file, function(article) {
    article.save(function(err, article) {
      if (err) return next(err);
      res.redirect(article.getShowPath());
    });
  });
}

exports.destroy = function(req, res) {
  req.article.remove();

  res.redirect('/articles');
}
