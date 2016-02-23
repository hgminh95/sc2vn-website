'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, unique: true },
  email: { type: String },
  bnet_id: { type: String, index: true, unique: true },
  access_token: { type: String },
  score: { type: Number, default: 0 }
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
  
  findById: function(id, callback) {
    return this.findOne({ bnet_id: id }).exec(callback);
  }
};

var User = mongoose.model('User', UserSchema);

module.exports = User;

