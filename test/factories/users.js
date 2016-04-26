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

factory.define('user_with_useful_info_without_recent_matches', User, {
	email: factory.sequence(function(n) {
		return 'user#' + n + 'email@email.com'
	}),
	password: 'testing123',
	name: factory.sequence(function(n) {
		return 'user_with_useful_info #' + n
	}),
	score: 1000,
	stats: {
		vs_zerg_games: 30,
    vs_protoss_games: 40,
    vs_terran_games: 50,
    vs_zerg_wins: 10,
    vs_protoss_wins: 11,
    vs_terran_wins: 12
	}
})