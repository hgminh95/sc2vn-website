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

StageSchema.pre('save', function(next) {
    if (this.isNew)
        this.createFromMetadata(this.metadata, next)
    else
        next()
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

        console.log("Call again")

        this.matches = []

        var stageMeta = JSON.parse(metadata)

        var self = this;

        Stage.populate(this, opts, function(err, stage) {
            if (err) return callback(err)

            console.log("Populate success " + JSON.stringify(stage))

            async.each(stageMeta.matches, function(match, cb) {
                console.log("Update match " + JSON.stringify(match))
                match.player_1 = stage.toUserId(match.player1, stage.players)
                match.player_2 = stage.toUserId(match.player2, stage.players)

                Match.create(match, function(err, m) {
                    if (err) return cb(err)

                    console.log("Create match successfully")
                    match._id = m._id
                    stage.matches.push(m)

                    cb(null)
                })
            }, function(err) {
                if (err) return callback(err)

                self.metadata = JSON.stringify(stageMeta)
                callback()
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
