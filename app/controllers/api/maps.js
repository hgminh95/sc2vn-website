'use strict'

var assign = require('object-assign')
var only = require('only')
var ScMap = require('../../models/maps')
var uploader = require('../../uploaders/map_thumbnails')

exports.load = function(req, res, next, id) {
  ScMap.findById(id, function(err, map) {
    if (err) next(err)

    req.map = map
    if (!req.map) return res.render('404')
    next()
  })
}

exports.create = function(req, res) {
  var map = new ScMap(only(req.body, ScMap.UPDATABLE_FIELDS))
  uploader.upload(map, req.file, function(map) {
    map.save(function(err) {
      if (err) return res.sendStatus(406)
      res.sendStatus(204)
    })
  })
}

exports.index = function(req, res) {
  ScMap.all(function(err, maps) {
    res.json(maps)
  });
}

exports.show = function(req, res) {
  res.json(req.map)
}

exports.update = function(req, res) {
  var map = req.map
  assign(map, only(req.body, ScMap.UPDATABLE_FIELDS))
  uploader.upload(map, req.file, function(map) {
    map.save(function(err) {
      if (err) return res.sendStatus(406)
      res.sendStatus(204)
    })
  })
}

exports.destroy = function(req, res) {
  req.map.remove();

  res.sendStatus(204);
}
