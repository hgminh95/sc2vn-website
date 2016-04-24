'use strict'

var factory = require('factory-girl')
var User = require('../../app/models/users')

factory.define('user_normal', User, {
	name: factory.sequence(function(n) {
		return 'user_normal #' + n
	})
})

factory.define('user_with_3_notifications', User, {
	name: factory.sequence(function(n) {
		return 'user_with_notifications #' + n
	}),
	notifications: factory.assocMany('notification_normal', 3)
})