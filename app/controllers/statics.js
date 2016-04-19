'use strict'

exports.admin = function(req, res) {
  res.render('admin/index')
}

exports.adminarea = function(req, res) {
  res.locals.breadcrumbs.push({
    name: 'Admin area',
    address: '/adminarea'
  })

  res.render('admin/area', {
    title: 'Admin area',
    pending: [{name: 'ABCDEF'}, {name: 'DEFGHI'}, {name: 'KLMNPQRS'}]
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
