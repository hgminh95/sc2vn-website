'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GamesSchema = new Schema({
  map: { type: String, require: true },
  status: {type: String, enum: ['win', 'lose', 'draw', 'not available']}
})

var MatchSchema = new Schema({
  player_1: { type: Schema.Types.ObjectId, ref: 'User'},
  player_2: { type: Schema.Types.ObjectId, ref: 'User'},
  date: {type: Date , require: true },
  games: [GamesSchema]
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

  score: function() {

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
  all: function(callback) {
    return this.find({}).exec(callback);
  },

  fields: function() {
    return 'player_1 player_2 date games'
  },

  getNewPath: function() {
    return '/matches/new';
  }
}

var Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
