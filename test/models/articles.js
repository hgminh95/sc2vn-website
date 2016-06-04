'use strict'

process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../../app')
var should = chai.should()

var factory = require('../factory')

chai.use(chaiHttp)

describe('Articles', function() {

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

  describe('#getShowPath()', function() {
    it('should get right show path', function(done) {
      factory.create('article_normal', function(err, article) {
        article.getShowPath().should.be.a('string')
        article.getShowPath().should.equal('/articles/' + article._id)
        done()
      })
    })
  })

})
