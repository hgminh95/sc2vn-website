'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    var winCount = 0;
    for (var i = 0; i < games.length; i++){
      if (this.games[i].status == 'win'){
        winCount++;
      }
      if (this.games[i].status == 'lose'){
        winCount--;
      }
      if (this.games[i].status == 'not available'){
        return null;
      }
    }
    if (winCount > 0) {return this.player_1;}
    if (winCount = 0) {return  null}
    if (winCount < 0) {return this.player_2;}
  },

  opponent: function(userId) {
    // TODO
    return null;
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

  to_json: function() {
    return {
      id: this._id,
      players: this.players,
      games: this.games.map(game => game._doc)
    };
  },

  getShowPath: function() {
    return '/matches/' + this._id;
  },

  getEditPath: function() {
    return '/matches/' + this._id + '/edit';
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

  allOfUser: function(userId, callback) {
    return this.find({
      $or: [
        { player_1: userId },
        { player_2: userId }
      ]
    }).exec(callback);
  },

  fields: function() {
    return 'player_1 player_2 tournament date games'
  },

  getNewPath: function() {
    return '/matches/new';
  }
}

var Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
