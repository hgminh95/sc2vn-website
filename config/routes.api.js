'use strict';

var express = require('express');

var users = require('../app/controllers/api/users');
var articles = require('../app/controllers/api/articles');
var tournaments = require('../app/controllers/api/tournaments');

var router = express.Router();

router.param('userId', users.load);

router.get('/users', users.index);
router.post('/users', users.create);
router.get('/users/:userId', users.show);
router.put('/users/:userId', users.update)
router.delete('/users/:userId', users.destroy);

router.param('articleId', articles.load);

router.get('/articles', articles.index);
router.post('/articles', articles.create);
router.get('/articles/:articleId', articles.show);
router.put('/articles/:articleId', articles.update)
router.delete('/articles/:articleId', articles.destroy);

router.param('tournamentId', tournaments.load);

router.get('/tournaments', tournaments.index);
router.post('/tournaments', tournaments.create);
router.get('/tournaments/:tournamentId', tournaments.show);
router.put('/tournaments/:tournamentId', tournaments.update);
router.delete('/tournaments/:tournamentId', tournaments.destroy);

module.exports = function(app) {
  app.use('/api', router);
}
