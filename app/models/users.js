'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Notification = require('./notifications');

var UserSchema = new Schema({
  name: { type: String, unique: true },
  email: { type: String },
  bnet_id: { type: String, index: true, unique: true },
  access_token: { type: String },
  
  race: { type: String, enum: ['zerg', 'terran', 'protoss', 'random'] },
  score: { type: Number, default: 0 },
  
  notifications: [Notification.schema]
},
{
   timestamps: {
     createdAt: 'created_at',
     updatedAt: 'updated_at'
   }
});

UserSchema.methods = {
  to_link: function() {
    return '/users/' + this.bnet_id;
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
    return 'name email score race';
  }
};

var User = mongoose.model('User', UserSchema);

module.exports = User;

