'use strict'

var assign = require('object-assign')
var only = require('only')

var Tournament = require('../models/tournaments')
var Stage = require('../models/stages')
var User = require('../models/users')

exports.load = function(req, res, next, id) {
    req.stage = req.tournament.stages[id]

    next()
}

exports.new = function(req, res, next) {
    res.type('application/javascript')
    res.render('stages/new')
}

exports.create = function(req, res, next) {
    var tournament = req.tournament

    tournament.stages.push(new Stage(req.body))

    tournament.save(function(err) {
        if (err) return next(err)

        res.redirect(tournament.getEditPath())
    })
}

exports.show = function(req, res, next) {

}

exports.updateMetadata = function(req, res, next) {
}
