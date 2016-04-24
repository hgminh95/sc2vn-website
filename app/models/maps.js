'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MapSchema = new Schema({
  name: { type: String, required: true },
  thumbnail: { type: String }
},
{
  timestamps: {
   createdAt: 'created_at',
   updatedAt: 'updated_at'
  }
});

MapSchema.statics = {
  UPDATABLE_FIELDS: 'name',

  all: function(callback) {
    return this.find({}).exec(callback);
  },
}

module.exports = mongoose.model('Map', MapSchema)
