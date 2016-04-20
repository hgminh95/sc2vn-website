'use strict';

var express = require('express');

var users = require('../app/controllers/api/users');
var articles = require('../app/controllers/api/articles');
var tournaments = require('../app/controllers/api/tournaments');
var matches = require('../app/controllers/api/matches');
var clans = require('../app/controllers/api/clans')
var settings = require('../app/controllers/api/settings')

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

router.param('matchID', matches.load);

router.get('/matches', matches.index);
router.post('/matches', matches.create);
router.get('/matches/:matchID', matches.show);
router.put('/matches/:matchID', matches.update);
router.delete('/matches/:matchID', matches.destroy);

router.param('clanId', clans.load)

router.get('/clans', clans.index);
router.post('/clans', clans.create);
router.get('/clans/:clanId', clans.show);
router.put('/clans/:clanId', clans.update);
router.delete('/clans/:clanId', clans.destroy);

//For settings
router.get('/settings', settings.index);
router.post('/settings', settings.create);
router.get('/settings/:settingId', settings.show);
router.put('/settings/:settingId', settings.update);
router.delete('/settings/:settingId', settings.destroy);

module.exports = function(app) {
  app.use('/api', router);
}
