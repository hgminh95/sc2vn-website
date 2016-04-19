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
  if (!req.isAuthenticated() || !req.article || !req.article.author.equals(req.user._id))
    return res.render('404')

  next()
}


exports.middleware = function(req, res, next) {
  res.locals.isUser = req.isAuthenticated()

  next()
}
