'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var Notification = require('./notifications');

var UserSchema = new Schema({
  // For authentication
  email: { type: String },
  password: { type: String },
  bnet_id: { type: String, index: true, unique: true },
  access_token: { type: String },

  // Basic informations
  name: { type: String, unique: true },
  race: { type: String, enum: ['zerg', 'terran', 'protoss', 'random'] },
  score: { type: Number, default: 0 },

  // Notifications
  notifications: [Notification.schema]

  // For statistics
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

  fields: function(callback) {
    return 'name email score race password bnet_id';
  },

  getNewPath: function() {
    return '/users/new';
  }
};

var User = mongoose.model('User', UserSchema);

module.exports = User;

