'use strict'

var factory = require('factory-girl')
var MongooseAdapter = require('factory-girl-mongoose').MongooseAdapter
factory.setAdapter(MongooseAdapter)

require('./factories/users')
require('./factories/notifications')
require('./factories/articles')

module.exports = factory