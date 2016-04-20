'use strict'

var express = require('express')

var users = require('../app/controllers/users')
var articles = require('../app/controllers/articles')
var tournaments = require('../app/controllers/tournaments')
var statics = require('../app/controllers/statics')
var usersMiddleware = require('../app/middlewares/users')
var matches = require('../app/controllers/matches')
var widgets = require('../app/controllers/widgets')
var base = require('../app/controllers/base')
var permission = require('../app/middlewares/permission')

module.exports = function(app) {

  app.use(base.init)

  app.use(users.loadCurrentUser)

  app.use(permission.middleware)

  app.use(usersMiddleware.checkNotification)

  app.use(widgets.recentMatches)
  app.use(widgets.topPlayers)


  // User Routes
  app.use(
    '/users',
    express.Router()
      .param('userId', users.load)
      .get('/recalculate', users.recalculateStatistics)
      .get('/', users.index)
      .post('/', users.create)
      .get('/rank', users.rank)
      .get('/login', users.login)
      .get('/register', users.register)
      .get('/:userId', users.show)
      .get('/:userId/edit', users.edit)
      .post('/:userId', users.update)
      .get('/:userId/resend_confirm_email', users.resendConfirmEmail)
      .get('/:userId/confirm/:confirm_token', users.confirm)
  )

  // Article Routes
  app.use(
    '/articles',
    express.Router()
      .use(articles.init)
      .param('articleId', articles.load)
      .get('/', articles.index)
      .get('/new', articles.new)
      .post('/', articles.create)
      .get('/:articleId', articles.show)
      .get('/:articleId/edit', permission.isArticleAuthor, articles.edit)
      .post('/:articleId', permission.isArticleAuthor, articles.update)
      .delete('/:articleId', permission.isArticleAuthor, articles.destroy)
  )

  // Tournament Routes
  app.use(
    '/tournaments',
    express.Router()
      .use(tournaments.init)
      .param('tournamentId', tournaments.load)
      .param('userId', users.load)
      .get('/', tournaments.index)
      .get('/new', tournaments.new)
      .post('/', tournaments.create)
      .get('/:tournamentId', tournaments.show)
      .get('/:tournamentId/edit', tournaments.edit)
      .post('/:tournamentId/register', tournaments.tournamentRegister)
      .post('/:tournamentId', tournaments.update)
      .delete('/:tournamentId', tournaments.destroy)
      .post('/:tournamentId/accept/:userId', tournaments.acceptUser)
      .post('/:tournamentId/deny/:userId', tournaments.denyUser)
      .post('/:tournamentId/invitation/:userId', tournaments.invitation)
      .post('/:tournamentId/acceptInvitation', tournaments.acceptInvitation)
      .post('/:tournamentId/declineInvitation', tournaments.declineInvitation)
  )

  // Match Routes
  app.use(
    '/matches',
    express.Router()
      .use(matches.init)
      .param('matchId', matches.load)
      .get('/', matches.index)
      .get('/new', matches.new)
      .post('/', matches.create)
      .get('/:matchId', matches.show)
      .get('/:matchId/edit', matches.edit)
      .post('/:matchId', matches.update)
      .delete('/:matchId', matches.destroy)
  )

  // Static Routes
  app.get('/admin', statics.admin)
  app.get('/adminarea', statics.adminarea)
  app.get('/changelog', statics.changelog)
  app.get('/faq', statics.faq)
  app.get('/features', statics.features)

  // Root
  app.get('/', articles.index)
};
