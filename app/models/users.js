'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var Notification = require('./notifications');
var Match = require('./matches');

var UserSchema = new Schema({
  // For authentication
  email: { type: String, index: { unique: true, sparse: true }},
  password: { type: String },
  bnet_id: { type: String, index: { unique: true, sparse: true }},
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
    // Extract information from match
    var win = this._id.equals(match.winner()) ? 1 : 0
    var opponentRace = match.opponentRace(this._id)

    // Add to recent matches
    var length = this.recent_matches.push({
      matchID: match._id,
      score: this.score + win * 10
    })
    if (length > 10) this.recent_matches.shift()

    // Update statistics
    this.score += win * 10
    if (opponentRace == 'zerg') {
      this.stats.vs_zerg_games += 1
      this.stats.vs_zerg_wins += win
    }
    else if (opponentRace == 'protoss') {
      this.stats.vs_protoss_games += 1
      this.stats.vs_protoss_wins += win
    }
    else if (opponentRace == 'terran') {
      this.stats.vs_terran_games += 1
      this.stats.vs_terran_wins += win
    }

    this.save(function(err) {
      if (err && callback) callback(err)
    })
  },

  removeMatch: function(match, callback) {
    for (var i = 0; i < this.recent_matches.length; i ++ ) {
      if (this.recent_matches[i].matchID.equals(match._id)) {
        this.recent_matches.splice(i, 1)
      }
    }

    var games = match.gamePlayed();
    var win = this._id.equals(match.winner()) ? 1 : 0
    var opponentRace = match.opponentRace(this._id)
    this.score -= win * 10

    if (opponentRace == 'zerg') {
      this.stats.vs_zerg_games -= 1
      this.stats.vs_zerg_wins -= win
    }
    else if (opponentRace == 'protoss') {
      this.stats.vs_protoss_games -= 1
      this.stats.vs_protoss_wins -= win
    }
    else if (opponentRace == 'terran') {
      this.stats.vs_terran_games -= 1
      this.stats.vs_terran_wins -= win
    }

    this.save(function(err) {
      if (err) callback(err)
    })
  },

  recalculateStatistics: function(callback) {
    var self = this

    self.resetStatistics()

    Match.allOfUser(this._id, function(err, matches) {
      for (var match of matches) {
        self.addMatch(match)
      }
    })
  },

  resetStatistics: function() {
    this.stats = {
      vs_terran_games: 0,
      vs_terran_wins: 0,
      vs_protoss_games: 0,
      vs_protoss_wins: 0,
      vs_zerg_games: 0,
      vs_zerg_wins: 0
    }

    this.score = 0
    this.recent_matches = []
  },

  totalWins: function() {
    return this.stats.vs_terran_wins + this.stats.vs_protoss_wins + this.stats.vs_zerg_wins
  },

  totalGames: function() {
    return this.stats.vs_terran_games + this.stats.vs_protoss_games + this.stats.vs_zerg_games
  },

  totalLosses: function() {
    return this.totalGames() - this.totalWins()
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

  getChartData: function() {
    if (!this.recent_matches)
      return []

    return this.recent_matches.map(match => match.score)
  },

  getShowPath: function() {
    return '/users/' + this._id;
  },

  getEditPath: function() {
    return '/users/' + this._id + '/edit';
  },

  getRaceImagePath: function() {
    return '/images/' + this.race + '-gray.png'
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
    return this.find({})
      .sort('-score')
      .populate('clan', 'name')
      .exec(callback)
  },

  top: function(options, callback) {
    options.perPage = options.perPage || 5
    options.page = 0

    this.find({})
      .sort({ score: 'desc' })
      .limit(options.perPage)
      .skip(options.page * options.perPage)
      .populate('clan', 'name')
      .exec(callback)
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

