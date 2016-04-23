'use strict'

var fs = require('fs')
var assign = require('object-assign')
var settings = require('../../../config/settings')

exports.create = function(req, res) {
  res.sendStatus(405)
}

exports.index = function(req, res) {
  assign(settings, { id: 1 })
  res.json([settings])
}

exports.show = function(req, res) {
  res.json(settings)
}

exports.update = function(req, res) {
  assign(settings, req.body)
  settings.save(function(err) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.sendStatus(200)
    }
  })
}

exports.destroy = function(req, res) {
  res.sendStatus(405)
}
