'use strict'

process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../app')
var should = chai.should()
var mongoose = require('mongoose')

for (var i in mongoose.connection.collections) {
  mongoose.connection.collections[i].remove(function() {});
}

chai.use(chaiHttp)

// describe('Main page', function() {

// 	it('should return main page', function(done) {
// 		chai.request(server)
// 			.get('/')
// 			.end(function(err, res) {
// 				res.should.have.status(200)
// 				done()
// 			})
// 	})

// })