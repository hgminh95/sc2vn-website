'use strict'

// must use after users.loadCurrentUser
exports.isUser = function(req, res, next) {
  if (!req.isAuthenticated())
    return res.render('404')

  next()
}

exports.isModerator = function(req, res, next) {
  if (!req.isAuthenticated() || (req.user.role != 'mod' && req.user.role != 'admin'))
    return res.render('404')

  next()
}

exports.isAdmin = function(req, res, next) {
  if (!req.isAuthenticated() || req.user.role == 'admin')
    return res.render('404')

  next()
}

// must use after articles.load
exports.isArticleAuthor = function(req, res, next) {
  if (req.isAuthenticated() && req.user.isAuthorOf(req.article))
    return next()

  res.render('404')
}

exports.isTournamentOwner = function(req, res, next) {
  if (req.isAuthenticated() && req.user.isOwnerOf(req.tournament))
    return next()

  res.render('404')
}

exports.isSameUser = function(req, res, next) {
  if (req.isAuthenticated() && req.user._id.equals(req.profile._id))
    return next()

  res.render('404')
}
