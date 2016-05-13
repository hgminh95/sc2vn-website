'use strict'

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
  save: function(metadata, callback) {
    var opts = [
      { path: 'matches' },
      { path: 'players' }
    ]

    var stage = JSON.parse(metadata)

    Stage.populate(this, opts, function(err, stage) {
      for (var match of stage.matches) {
        // convert user to user._id
        match.player_1 = toUserId(player1)
        match.player_2 = toUserId(player2)

        // create new match if match.id does not exist
        if (match.id == null) {
          Match.create(match, function(err, match) {
            if (err) throw err
          })
        }
        // otherwise, update match info
        else {
          Match.update({ _id: match.id }, match, {}, function(err, numAffected) {
            if (err) throw err
          })
        }
      }
    })
  },

  toUserId(userName) {
    var player = players.find(user => user.name == userName)

    return player == null ? null : player._id
  }
}

StageSchema.statics = {

}

var Stage = mongoose.model('Stage', StageSchema)

module.exports = Stage
