'use strict'

var factory = require('factory-girl')
var Notification = require('../../app/models/notifications')

factory.define('notification_normal', Notification, {
	message: "Here is notification's message"
})