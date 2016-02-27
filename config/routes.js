'use strict';

var users = require('../app/controllers/users');
var articles = require('../app/controllers/articles');
var statics = require('../app/controllers/statics')

module.exports = function(app) {

  app.use(users.loadCurrentUser);

  // User Routes
  app.param('userId', users.load);

  app.get('/users', users.index);
  app.get('/users/:userId', users.show);
  app.get('/users/:userId/edit', users.edit);
  app.post('/users/:userId', users.update);

  // Article Routes
  app.param('articleId', articles.load);

  app.get('/articles', articles.index);
  app.get('/articles/new', articles.new)
  app.post('/articles', articles.create);
  app.get('/articles/:articleId', articles.show);
  app.get('/articles/:articleId/edit', articles.edit);
  app.post('/articles/:articleId', articles.update);

  // Static Routes
  app.get('/admin', statics.admin);
};
