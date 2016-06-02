'use strict'

var async = require('async')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Match = require('./matches')

var StageSchema = new Schema({
  name: { type: String },
  metadata: { type: String },
  matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},
{
  _id: false
})

StageSchema.methods = {
  updateMetadata: function(callback) {
    var opts = [
      { path: 'matches' },
      { path: 'players' }
    ]

    var stageMeta = JSON.parse(metadata)

    Stage.populate(this, opts, function(err, stage) {
      if (err) return callback(err)

      for (let match of stageMeta.matches) {
        if (match._id == null) return callback(err)
      }
    })
  },

  createFromMetadata: function(metadata, callback) {
    var opts = [
      { path: 'matches' },
      { path: 'players' }
    ]

    this.matches = []

    var stageMeta = JSON.parse(metadata)

    Stage.populate(this, opts, function(err, stage) {
      if (err) return callback(err)

      var self = this
      async.each(stageMeta.matches, function(match, callback) {
        match.player_1 = self.toUserId(player1, stage.players)
        match.player_2 = self.toUserId(player2, stage.players)

        Match.create(match, function(err, match) {
          if (err) return callback(err)

          stage.matches.push(match)

          callback(null)
        })
      }, function(err) {
        if (err) return callback(err)

        stage.save(function(err, stage) {
          if (err) return callback(err)

          callback(err, stage)
        })
      })
    })
  },

  toUserId: function(userName, players) {
    var player = players.find(user => user.name == userName)

    return player == null ? null : player._id
  }
}

StageSchema.statics = {

}

var Stage = mongoose.model('Stage', StageSchema)

module.exports = Stage
