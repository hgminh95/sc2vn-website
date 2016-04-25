'use strict'

var factory = require('factory-girl')
var Match = require('../../app/models/matches')

factory.define('match_normal_terran_vs_protoss', Match, {
	player_1: factory.assoc('user_normal', '_id'),
	player_2: factory.assoc('user_normal', '_id'),
	date: new Date(2016, 6, 4),
	games: [
	{
		map: 'map_name',
		status: 'win',
		race1: 'terran',
		race2: 'protoss'
	},
	{
		map: 'map_name',
		status: 'lose',
		race1: 'terran',
		race2: 'protoss'
	},
	{
		map: 'map_name',
		status: 'win',
		race1: 'terran',
		race2: 'protoss'
	}]
})