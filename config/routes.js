'use strict';

var users = require('../app/controllers/users');
var articles = require('../app/controllers/articles');
var tournaments = require('../app/controllers/tournaments');
var statics = require('../app/controllers/statics');
var usersMiddleware = require('../app/middlewares/users');
var matchs = require('../app/controllers/matchs');

module.exports = function(app) {

  app.use(users.loadCurrentUser);
  app.use(usersMiddleware.checkNotification);

  // User Routes
  app.param('userId', users.load);

  app.get('/users', users.index);
  app.get('/users/rank', users.rank);
  app.get('/users/:userId', users.show);
  app.get('/users/:userId/edit', users.edit);
  app.post('/users/:userId', users.update);

  // Article Routes
  app.param('articleId', articles.load);

  app.get('/articles', articles.index);
  app.get('/articles/new', articles.new);
  app.post('/articles', articles.create);
  app.get('/articles/:articleId', articles.show);
  app.get('/articles/:articleId/edit', articles.edit);
  app.post('/articles/:articleId', articles.update);
  app.delete('/articles/:articleId', articles.destroy)

  // Tournament Routes
  app.param('tournamentId', tournaments.load);

  app.get('/tournaments', tournaments.index);
  app.get('/tournaments/new', tournaments.new);
  app.post('/tournaments', tournaments.create);
  app.get('/tournaments/:tournamentId', tournaments.show);
  app.get('/tournaments/:tournamentId/edit', tournaments.edit);
  app.post('/tournaments/:tournamentId', tournaments.update);
  app.delete('/tournaments/:tournamentId', tournaments.destroy);

  //Match Routes
  app.param('matchId', tournaments.load);

  app.get('/matchs', matchs.index);
  app.get('/matchs/new', matchs.new);
  app.post('/matchs', matchs.create);
  app.get('/matchs/:matchId', matchs.show);
  app.get('/matchs/:matchId/edit', matchs.edit);
  app.post('/matchs/:matchId', matchs.update);
  app.delete('/matchts/:matchId', matchs.destroy);

  // Static Routes
  app.get('/admin', statics.admin);

  // Root
  app.get('/', articles.index);
};
