'use strict'

var factory = require('factory-girl')
var MongooseAdapter = require('factory-girl-mongoose').MongooseAdapter
factory.setAdapter(MongooseAdapter)

require('./factories/users')
require('./factories/notifications')
require('./factories/articles')
require('./factories/matches')
require('./factories/maps')

module.exports = factory