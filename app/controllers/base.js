'use strict'

var settings = require('../../config/settings')

exports.init = function(req, res, next) {
  res.locals.breadcrumbs = [
    {
      name: 'Home',
      address: '/'
    }
  ]

  next()
}
