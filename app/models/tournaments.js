'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistrationSchema = new Schema({
  registrable: { type: Boolean },
  startDate: {type: Date},
  endDate: {type: Date},
  pending: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  infor_required: {type: String},
  participant: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},
{
  _id: false
})

var InvitationSchema = new Schema({
  pending: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  participant: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

var TournamentSchema = new Schema({
  name: { type: String, require: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  staffs: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  banner: { type: String },
  introduction: { type: String },
  rule: { type: String },
  faq: { type: String },
  registration: { type: RegistrationSchema },
  invitation: { type: InvitationSchema }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

TournamentSchema.methods = {
  to_json: function() {
    return {
      id: this._id,
      name: this.name,
      sections: this.sections.map(section => section._doc)
    };
  },

  getShowPath: function() {
    return '/tournaments/' + this._id;
  },

  getEditPath: function() {
    return '/tournaments/' + this._id + '/edit';
  }
}

TournamentSchema.statics = {
  all: function(callback) {
    return this.find({}).exec(callback);
  },

  fields: function() {
    return 'name owner staffs banner introduction rule faq price registration invitation'
  },

  getNewPath: function() {
    return '/tournaments/new';
  }
}

var Tournament = mongoose.model('Tournament', TournamentSchema);

module.exports = Tournament;
