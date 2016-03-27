'use strict'

exports.admin = function(req, res) {
  res.render('admin/index')
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
