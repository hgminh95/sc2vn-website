'use strict';

var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var Match = require('./matches')
var Stage = require('./stages')

var RegistrationSchema = new Schema({
  registrable: { type: Boolean },
  startDate: { type: Date },
  endDate: { type: Date },
  pending: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  infor_required: { type: String },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},
{
  _id: false
})

var InvitationSchema = new Schema({
  pending: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},
{
  _id: false
})

var TournamentSchema = new Schema({
  name: { type: String, require: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  staffs: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  banner: { type: String },
  introduction: { type: String },
  rule: { type: String },
  faq: { type: String },
  registration: { type: RegistrationSchema, required: true, default: {}  },
  invitation: { type: InvitationSchema, required: true, default: {} },
  stages: { type: [Stage.schema] },
  status: { type: String, enum: ['pending', 'normal'], default: 'pending'}
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

TournamentSchema.methods = {
  addParticipant: function(user) {
    this.registration.participants.push(user);
    this.save();
  },

  addPending: function(user) {
    console.log('addsafasd');
    this.registration.pending.push(user);
    this.save();
  },

  removePending: function(user) {
    this.registration.pending.remove(user._id);
    this.save();
  },

  removePaticipant: function(user) {
    this.registration.participants.remove(user._id);
    this.save();
  },

  addInvitation: function(user) {
    this.invitation.participants.push(user);
    this.save();
  },

  addPendingInvitation: function(user) {
    console.log(this.registration.registrable);
    this.invitation.pending.push(user);
    this.save();
  },

  removePendingInvitation: function(user) {
    this.invitation.pending.remove(user._id);
    this.save();
  },

  addStaff: function(user) {
    this.staffs.push(user);
    this.save();
  },

  removeStaff: function(user) {
    this.staffs.remove(user._id);
    this.save();
  },

  getShowPath: function() {
    return '/tournaments/' + this._id;
  },

  getEditPath: function() {
    return '/tournaments/' + this._id + '/edit';
  },

  getRegisterPath: function() {
    return '/tournaments/' + this._id + '/register'
  },

  toJson: function(callback) {
    Match.find({ tournament: this._id }).exec(function(err, matches) {
      if (err) callback(err)

      var json = { players: [ ' ', ' ', ' ' ], matches: [] }
      for (var match of matches) {
        json.matches.push(match.toJson())
      }

      callback(null, json)
    })
  }
}

TournamentSchema.statics = {
  all: function(callback) {
    return this.find({}).exec(callback)
  },

  pending: function(callback) {
    return this.find({status: 'pending'}).exec(callback)
  },

  normal: function(callback) {
    return this.find({status: 'normal'}).exec(callback)
  },

  fields: function() {
    return 'name owner staffs banner introduction rule faq price registration invitation stages'
  },

  getNewPath: function() {
    return '/tournaments/new'
  }
}

var Tournament = mongoose.model('Tournament', TournamentSchema)

module.exports = Tournament
