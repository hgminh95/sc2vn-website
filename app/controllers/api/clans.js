'uses strict'

var assign = require('object-assign')
var only = require('only')
var Clan = require('../../models/clans')

exports.load = function(req, res, next, id) {
  Clan.findById(id, function(err, clan) {
    if (err) return next(err)

    req.clan = clan
    if (!req.clan) return res.render('404')
    next()
  })
}

exports.index = function(req, res) {
  Clan.all(function(err, clans) {
    res.json(clans)
  })
}

exports.show = function(req, res) {
  res.json(req.clan)
}

exports.create = function(req, res) {
  var clan = new Clan(only(req.body, Clan.fields()))
  clan.save(function(err) {
    if (err) return res.sendStatus(406)

    res.sendStatus(201)
  })
}

exports.update = function(req, res) {
  var clan = req.clan

  assign(clan, only(req.body, Clan.fields()))
  clan.save(function(err) {
    if (err) return res.sendStatus(406)

    res.sendStatus(201)
  })
}

exports.destroy = function(req, res) {
  req.clan.remove(function(err) {
    if (err) return res.sendStatus(406)

    res.sendStatus(204)
  })
}
