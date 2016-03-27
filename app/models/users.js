'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var Notification = require('./notifications');
var Match = require('./matches');

var UserSchema = new Schema({
  // For authentication
  email: { type: String, index: true, unique: true, sparse: true },
  password: { type: String },
  bnet_id: { type: String, index: true, unique: true, sparse: true },
  access_token: { type: String },

  // Basic informations
  name: { type: String, unique: true },
  avatar: { type: String },
  race: { type: String, enum: ['zerg', 'terran', 'protoss', 'random'] },
  clan: { type: Schema.Types.ObjectId, ref: 'Clan' },
  introduction: { type: String, maxlength: 100 },

  // For statistics
  score: { type: Number, default: 0 },
  rank: { type: Number },

  recent_matches: [{
    matchID: { type: Schema.Types.ObjectId, ref: 'Clan' },
    score: { type: Number, default: 0 }
  }],

  stats: {
    vs_zerg_games: { type: Number, default: 0 },
    vs_protoss_games: { type: Number, default: 0 },
    vs_terran_games: { type: Number, default: 0 },
    vs_zerg_wins: { type: Number, default: 0 },
    vs_protoss_wins: { type: Number, default: 0 },
    vs_terran_wins: { type: Number, default: 0 }
  },

  // Notifications
  notifications: { type: [Notification.schema] }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
  next();
});

UserSchema.methods = {
  verifyPassword: function(password) {
    return bcrypt.compareSync(password, this.password);
  },

  calculateRank: function () {

  },

  addMatch: function(match, callback) {
    // Add to recent matches
    var score = match.score(this._id);
    var length = this.recent_matches.unshift({
      matchID: match._id,
      score: score
    });
    if (length > 10) this.recent_matches.pop();

    // Update statistics
    this.score += score;
    var games = match.gamePlayed();
    var wins = match.gameWins(this._id);
    var opponent = match.opponent(this._id);

    if (opponent.race == 'zerg') {
      this.stats.vs_zerg_games += games;
      this.stats.vs_zerg_wins += wins;
    }
    else if (opponent.race == 'protoss') {
      this.stats.vs_protoss_games += games;
      this.stats.vs_protoss_wins += wins;
    }
    else if (opponent.race == 'terran') {
      this.stats.vs_terran_games += games;
      this.stats.vs_terran_wins += wins;
    }

    // Save
    this.save(function(err) {
      if (err) callback(err);
    });
  },

  removeMatch: function(match, callback) {
    for (var i = 0; i < this.recent_matches.length; i ++ ) {
      if (this.recent_matches[i].matchID.equals(match._id)) {
        this.recent_matches.splice(i, 1);
      }
    }

    this.score -= match.score(this._id);

    var games = match.gamePlayed();
    var wins = match.gameWins(user._id);
    var opponent = match.opponent(user._id);

    if (opponent.race == 'zerg') {
      this.stats.vs_zerg_games -= games;
      this.stats.vs_zerg_wins -= wins;
    }
    else if (opponent.race == 'protoss') {
      this.stats.vs_protoss_games -= games;
      this.stats.vs_protoss_wins -= wins;
    }
    else if (opponent.race == 'terran') {
      this.stats.vs_terran_games -= games;
      this.stats.vs_terran_wins -= wins;
    }

    this.save(function(err) {
      if (err) callback(err);
    });
  },

  recalculateStatistics: function(callback) {
    var user = this;
    Match.allOfUser(this._id, function(err, matches) {
      var score = 0;
      var vs_zerg_games = 0;
      var vs_zerg_wins = 0;
      var vs_terran_games = 0;
      var vs_terran_wins = 0;
      var vs_protoss_games = 0;
      var vs_protoss_wins = 0;

      matches.forEach(function(match, index, matches) {
        var games = match.gamePlayed();
        var wins = match.gameWins(user._id);
        var opponent = match.opponent(user._id);
        score += match.score(user._id);

        if (opponent.race == 'zerg') {
          vs_zerg_games += games;
          vs_zerg_wins += wins;
        }
        else if (opponent.race == 'protoss') {
          vs_protoss_games += games;
          vs_protoss_wins += wins;
        }
        else if (opponent.race == 'terran') {
          vs_terran_games += games;
          vs_terran_wins += wins;
        }
      });

      user.score = score;
      user.stats = {
        vs_terran_games: vs_terran_games,
        vs_terran_wins: vs_terran_wins,
        vs_protoss_games: vs_protoss_games,
        vs_protoss_wins: vs_protoss_wins,
        vs_zerg_games: vs_zerg_games,
        vs_zerg_wins: vs_zerg_wins
      }
      user.save(function(err) {
        if (err) callback(err);
      });
    });
  },

  totalWins: function() {
    return this.stats.vs_terran_wins + this.stats.vs_protoss_wins + this.stats.vs_zerg_wins
  },

  totalGames: function() {
    return this.stats.vs_terran_games + this.stats.vs_protoss_games + this.stats.vs_zerg_games
  },

  totalLosses: function() {
    return this.totalWins() - this.totalWins()
  },

  addNotification: function(notification) {
    this.notifications.push(notification);
    this.save();
  },

  removeNotifications: function(notifications) {
    for (var i = 0; i < notifications.length; i ++) {
      this.notifications.remove(notifications[i]._id);
    }
    this.save();
  },

  to_json: function() {
    var userJson = this._doc;
    userJson.notifications = this.notifications.map(notification => notification._doc)
    return userJson;
  },

  getShowPath: function() {
    return '/users/' + this._id;
  },

  getEditPath: function() {
    return '/users/' + this._id + '/edit';
  }
}

UserSchema.statics = {
  newWithBnetProfile: function(profile) {
    return this({
      name: profile.battletag,
      bnet_id: profile.id,
      access_token: profile.token
    });
  },

  all: function(callback) {
    return this.find({}).exec(callback);
  },

  allWithRanking: function(callback) {
    return this.find({}).sort('-score').exec(callback);
  },

  findById: function(id, callback) {
    return this.findOne({ _id: id }).exec(callback);
  },

  findByBnetId: function(id, callback) {
    return this.findOne({ bnet_id: id }).exec(callback);
  },

  findByEmail: function(email, callback) {
    return this.findOne({ email: email }).exec(callback);
  },

  fields: function(callback) {
    return 'email password bnet_id name avatar race clan introduction';
  },

  createFields: function() {
    return 'email password name race clan introduction';
  },

  getNewPath: function() {
    return '/users/new';
  }
};

var User = mongoose.model('User', UserSchema);

module.exports = User;

