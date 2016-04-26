'use strict'

process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../../app')
var should = chai.should()

var factory = require('../factory')

chai.use(chaiHttp)

describe('Matches', function() {

  before(function(done) {
    factory.cleanup()
    done()
  })

  beforeEach(function(done) {
    done()
  })

  afterEach(function(done) {
    factory.cleanup()
    done()
  })

  after(function(done) {
    factory.cleanup()
    done()
  })

  describe('#winner()', function() {
  	it('should player 1 winner', function(done) {
      factory.create('user_normal', function(err, user1) {
        factory.create('user_normal', function(err, user2) {
          factory.create('match_normal_terran_vs_protoss', { player_1: user1._id, player_2: user2._id}, function(err, match) {
            match.winner().should.equal(user1._id)
            done()
          })
        })
      })
  	})
  })

})