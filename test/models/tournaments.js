'use strict'

process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../../app')
var should = chai.should()

var factory = require('../factory')

chai.use(chaiHttp)

describe('Tournaments', function() {

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

  describe('#addParticipant()', function() {
    it('should add participant', function(done) {
      factory.create('tournament_normal', function(err, tournament) {
        tournament.registration.registrable.should.equal(true)
        factory.create('user_normal', function(err, user) {
          tournament.registration.participants.should.be.a('array')
          tournament.registration.participants.should.have.length(0)
          tournament.addParticipant(user)
          tournament.registration.participants.should.have.length(1)
          tournament.registration.participants[0].should.equal(user._id)
          done()
        })
      })
    })
    it('should add participants', function(done) {
      factory.create('tournament_normal', function(err, tournament) {
        tournament.registration.registrable.should.equal(true)
        factory.createMany('user_normal', 10, function(err, users) {
          tournament.registration.participants.should.be.a('array')
          tournament.registration.participants.should.have.length(0)
          users.forEach(function(user) {
            tournament.addParticipant(user)
          })
          tournament.registration.participants.should.have.length(10)
          users.forEach(function(user, index) {
            tournament.registration.participants[index].should.equal(user._id)
          })
          done()
        })
      })
    })
  })

  describe('#addPending()', function() {
    it('should not add 1 pending user twice', function(done) {
      factory.create('tournament_normal', function(err, tournament) {
        factory.create('user_normal', function(err, user) {
          tournament.registration.pending.should.be.a('array')
          tournament.registration.pending.should.have.length(0)
          tournament.addPending(user)
          tournament.addPending(user)
          tournament.registration.pending.should.have.length(1)
          done()
        })
      })
    })
    it('should not add if tournament unregistrable', function(done) {
      factory.create('tournament_unregistrable', function(err, tournament) {
        factory.create('user_normal', function(err, user) {
          tournament.registration.pending.should.be.a('array')
          tournament.registration.pending.should.have.length(0)
          tournament.addPending(user)
          tournament.registration.pending.should.have.length(0)
          done()
        })
      })
    })
  })

  describe('#removePending()', function() {
    it('should remove correctly', function(done) {
      factory.create('tournament_normal', function(err, tournament) {
        factory.create('user_normal', function(err, user) {
          tournament.addPending(user)
          tournament.registration.pending.should.be.a('array')
          tournament.registration.pending.should.have.length(1)
          tournament.removePending(user)
          tournament.registration.pending.should.have.length(0)
          done()
        })
      })
    })
    it('should remove user not in pending list', function(done) {
      factory.create('tournament_normal', function(err, tournament) {
        factory.create('user_normal', function(err, user) {
          tournament.registration.pending.should.be.a('array')
          tournament.registration.pending.should.have.length(0)
          tournament.removePending(user)
          tournament.registration.pending.should.have.length(0)
          done()
        })
      })
    })
  })

  // describe('#addInvitation()', function() {
  //   it('should add invitation', function(done) {
  //     factory.create('tournament_normal', function(err, tournament) {
  //       factory.create('user_normal', function(err, user) {
  //         tournament.invitation.participants.should.be.a('array')
  //         tournament.invitation.participants.should.have.length(0)
  //         tournament.addInvitation(user)
  //         tournament.invitation.participants.should.have.length(1)
  //         tournament.invitation.participants[0].should.equal(user._id)
  //         done()
  //       })
  //     })
  //   })
  //   it('should add invitations', function(done) {
  //     factory.create('tournament_normal', function(err, tournament) {
  //       console.log(tournament)
  //       factory.createMany('user_normal', 10, function(err, users) {
  //         tournament.invitation.participants.should.be.a('array')
  //         tournament.invitation.participants.should.have.length(0)
  //         users.forEach(function(user) {
  //           tournament.addInvitation(user)
  //         })
  //         tournament.invitation.participants.should.have.length(10)
  //         users.forEach(function(user, index) {
  //           tournament.invitation.participants[index].should.equal(user._id)
  //         })
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // describe('#addPendingInvitation()', function() {
  //   it('should not add 1 pending user twice', function(done) {
  //     factory.create('tournament_normal', function(err, tournament) {
  //       factory.create('user_normal', function(err, user) {
  //         tournament.invitation.pending.should.be.a('array')
  //         tournament.invitation.pending.should.have.length(0)
  //         tournament.addPendingInvitation(user)
  //         tournament.addPendingInvitation(user)
  //         tournament.invitation.pending.should.have.length(1)
  //         done()
  //       })
  //     })
  //   })
  // })
  //
  // describe('#removePendingInvitation()', function() {
  //   it('should remove correctly', function(done) {
  //     factory.create('tournament_normal', function(err, tournament) {
  //       factory.create('user_normal', function(err, user) {
  //         tournament.addPendingInvitation(user)
  //         tournament.invitation.pending.should.be.a('array')
  //         tournament.invitation.pending.should.have.length(1)
  //         tournament.removePendingInvitation(user)
  //         tournament.invitation.pending.should.have.length(0)
  //         done()
  //       })
  //     })
  //   })
  //   it('should remove user not in pending list', function(done) {
  //     factory.create('tournament_normal', function(err, tournament) {
  //       factory.create('user_normal', function(err, user) {
  //         tournament.invitation.pending.should.be.a('array')
  //         tournament.invitation.pending.should.have.length(0)
  //         tournament.removePendingInvitation(user)
  //         tournament.invitation.pending.should.have.length(0)
  //         done()
  //       })
  //     })
  //   })
  // })

})
