'use strict'

var factory = require('factory-girl')
var Maps = require('../../app/models/maps')

factory.define('map_normal', Maps, {
	name: factory.sequence(function(n) {
		return 'map_number #' + n
	})
})