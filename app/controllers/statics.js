'use strict'

var async = require('async')

var Tournament = require('../models/tournaments')

exports.admin = function(req, res) {
  res.render('admin/index')
}

exports.adminarea = function(req, res) {
  res.locals.breadcrumbs.push({
    name: 'Admin area',
    address: '/adminarea'
  })

  async.parallel({
    pending: function(callback) {
      return Tournament.pending(callback)
    }
  }, function(err, results) {
    res.render('admin/area', {
      title: 'Admin area',
      pending: results.pending
    })
  })
}

exports.faq = function(req, res) {
  res.render('statics/faq')
}

exports.changelog = function(req, res) {
  res.render('statics/changelog')
}

exports.features = function(req, res) {
  res.render('statics/features')
}
