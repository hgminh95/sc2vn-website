'use strict'

var Tournament = require('../../app/models/tournaments')
var factory = require('factory-girl')

factory.define('tournament_normal', Tournament, {
	name: factory.sequence(function(n) {
		return 'Tournament #' + n
	}),
  registration: {
    registrable: true
  }
})

factory.define('tournament_unregistrable', Tournament, {
	name: factory.sequence(function(n) {
		return 'Tournament #' + n
	}),
  registration: {
    registrable: false
  }
})
