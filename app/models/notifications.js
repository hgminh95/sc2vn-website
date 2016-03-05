'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
  message: { type: String },
  link: { type: String },
  icon: { type: String }
},
{
   timestamps: { createdAt: 'created_at' }
});

var Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;

