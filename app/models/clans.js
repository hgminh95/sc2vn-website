'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClanSchema = new Schema({
	owner: { type: Schema.Types.ObjectId, ref: 'User'},
	staffs: [{ type: Schema.Types.ObjectId, ref: 'User'}],
	banner: { type: String },
	introduction: { type: String },
	member: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

ClanSchema.methods = {

}

ClanSchema.statics = {
  all: function(callback) {
    return this.find({}).exec(callback);
  },

  fields: function() {
    return 'owner staff banner introduction member'
  },

  getNewPath: function() {
    return '/clans/new'
  }
}

var Clan = mongoose.model('Clan', ClanSchema);

module.exports = Clan;