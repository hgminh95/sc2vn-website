'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment')

var today = moment().startOf('day')

var GameSchema = new Schema({
  map: { type: String, require: true },
  status: { type: String, enum: ['win', 'lose', 'draw', 'not available'] },
  duration: { type: String },
  race1: { type: String, enum: ['zerg', 'protoss', 'terran'] },
  race2: { type: String, enum: ['zerg', 'protoss', 'terran'] },
  replay: { type: String }
})

var MatchSchema = new Schema({
  player_1: { type: Schema.Types.ObjectId, ref: 'User' },
  player_2: { type: Schema.Types.ObjectId, ref: 'User' },
  group: { type: String },
  index: { type: Number },
  link1: { type: String },
  link2: { type: String },
  tournament: { type: Schema.Types.ObjectId, ref: 'Tournament' },
  date: {type: Date , require: true },
  games: [GameSchema]
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

MatchSchema.methods = {
  winner: function() {
    var winCount = 0
    for (var i = 0; i < this.games.length; i++) {
      if (this.games[i].status == 'win')
        winCount++
      else if (this.games[i].status == 'lose')
        winCount--
      else if (this.games[i].status == 'not available')
        return null
    }
    if (winCount > 0) return this.player_1
    if (winCount == 0) return null
    if (winCount < 0) return this.player_2
  },

  opponent: function(userId) {
    if (userId == this.player_1)
      return this.player_2
    else if (userId == this.player_2)
      return this.player_1
    else
      return null
  },

  races: function() {
    if (this.games.length == 0)
      return ['', '']
    else
      return [this.games[0].race1, this.games[0].race2]
  },

  opponentRace: function(userId) {
    if (this.games.length == 0)
      return ''
    else {
      if (userId.equals(this.player_1))
        return this.games[0].race2
      else if (userId.equals(this.player_2))
        return this.games[0].race1
      else
        return ''
    }
  },

  score: function(userId) {
    // TODO
    return 0;
  },

  gamePlayed: function() { return this.games.length; },

  gameWins: function(userId) {
    var wins = this.games.filter(function(game){
      return game.status == 'win';
    });
    if (this.player_1.equals(userId)) return wins.length;
    if (this.player_2.equals(userId)) return this.gamePlayed() - wins.length;
    return 0;
  },

  getShowPath: function() {
    return '/matches/' + this._id;
  },

  getEditPath: function() {
    return '/matches/' + this._id + '/edit';
  },

  toJson: function() {
    return {
      id: this.index,
      player1: this.link1,
      player2: this.link2,
      group: this.group,
      score1: 2,
      score2: 1
    }
  }
}

MatchSchema.statics = {
  list: function(options, callback) {
    options.perPage = options.perPage || 10
    options.page = options.page || 1

    this.find({})
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(callback)
  },

  all: function(callback) {
    return this.find({}).exec(callback);
  },

  live: function(callback) {
    return this.find({
        "date" : {
          "$lt" : today.toDate()
        }
      })
      .sort({ date: 'desc' })
      .populate('player_1')
      .populate('player_2')
      .populate('tournament', 'name banner')
      .exec(function(err, matches) {
        callback(err, matches.filter(match => match.winner() == null))
      })
  },

  upcomming: function(callback) {
    return this.find({
        "date": {
          "$gt": today.toDate()
        }
      })
      .sort({ date: 'asc' })
      .populate('player_1')
      .populate('player_2')
      .populate('tournament', 'name banner')
      .exec(function(err, matches) {
        callback(err, matches.filter(match => match.winner() == null))
      })
  },

  past: function(options, callback) {
    options.perPage = options.perPage || 5
    options.page = options.page || 0

    return this.find({
        "date": {
          "$lte": today.toDate()
        }
      })
      .sort({ date: 'desc' })
      .limit(options.perPage)
      .skip(options.page * options.perPage)
      .populate('player_1')
      .populate('player_2')
      .populate('tournament', 'name banner')
      .exec(function(err, matches) {
        callback(err, matches.filter(match => match.winner() != null))
      })
  },

  allOfUser: function(userId, callback) {
    return this.find({
      $or: [
        { player_1: userId },
        { player_2: userId },
      ]
    }).exec(callback);
  },

  fields: function() {
    return 'player_1 player_2 tournament group index link1 link2 date games'
  },

  getNewPath: function() {
    return '/matches/new';
  }
}

var Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
