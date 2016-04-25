'use strict'

process.env.NODE_ENV = 'test'

var chai = require('chai')
var server = require('../../app')
var should = chai.should()

var factory = require('../factory')

describe('Users', function() {

  before(function(done) {
    factory.cleanup()
    done()
  })

  beforeEach(function(done) {
    factory.cleanup()
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

  describe('#addNotification()', function() {
    it('should add notification for user', function(done) {
      factory.create('user_normal', function(err, user) {
        factory.create('notification_normal', function(err, noti) {
          user.addNotification(noti)
          user.should.have.property('notifications')
          user.notifications.should.be.a('array')
          user.notifications.should.have.length(1)
          user.notifications[0].message.should.be.a('string')
          user.notifications[0].message.should.equal("Here is notification's message")
          done()
        })
      })
    })
    it('should add mutiple notifications for user', function(done) {
      factory.create('user_normal', function(err, user) {
        factory.createMany('notification_normal', 5, function(err, notis) {
          notis.forEach(function(noti) {
            user.addNotification(noti)
          })
          user.should.have.property('notifications')
          user.notifications.should.be.a('array')
          user.notifications.should.have.length(5)
          done()
        })
      })
    })
  })

  describe('#removeNotification()', function() {
    it('should remove notifications for user', function(done) {
      factory.create('user_with_3_notifications', function(err, user) {
        user.removeNotifications(user.notifications)
        user.should.have.property('notifications')
        user.notifications.should.be.a('array')
        user.notifications.should.have.length(0)
        done()
      })
    })
    it('should remove a specific notification', function(done) {
      factory.create('user_normal', function(err, user) {
        factory.createMany('notification_normal', 5, function(err, notis) {
          notis.forEach(function(noti) {
            user.addNotification(noti)
          })
          factory.create('notification_normal', function(err, specificNoti) {
            user.addNotification(specificNoti)
            user.should.have.property('notifications')
            user.notifications.should.be.a('array')
            user.notifications.should.have.length(6)
            var specificNotiArray = []
            specificNotiArray.push(specificNoti)

            user.removeNotifications(specificNotiArray)
            user.should.have.property('notifications')
            user.notifications.should.be.a('array')
            user.notifications.should.have.length(5)
            user.notifications.forEach(function(noti) {
              user.notifications.should.not.equal(specificNoti)
            })

            user.removeNotifications(notis)
            user.should.have.property('notifications')
            user.notifications.should.be.a('array')
            user.notifications.should.have.length(0)
            done()
          })
        })
      })
    })
  })

  describe('#addMatch()', function() {
    it('should add match to winner of the match', function(done) {
      factory.create('user_with_useful_info_without_recent_matches', function(err, user) {
        factory.create('match_normal_terran_vs_protoss', { player_1: user._id }, function(err, match) {
          user.addMatch(match)
          user.stats.vs_protoss_games.should.equal(41)
          user.stats.vs_protoss_wins.should.equal(12)
          done()
        })
      })
    })
    it('should add match to loser of the match', function(done) {
      factory.create('user_normal', function(err, user) {
        factory.create('match_normal_terran_vs_protoss', { player_2: user._id }, function(err, match) {
          user.addMatch(match)
          user.stats.vs_protoss_games.should.equal(0)
          user.stats.vs_protoss_wins.should.equal(0)
          done()
        })
      })
    })
  })

  describe('#removeMatch()', function() {
    it('should remove match to winner of the match', function(done) {
      factory.create('user_with_useful_info_without_recent_matches', function(err, user) {
        factory.create('match_normal_terran_vs_protoss', { player_1: user._id }, function(err, match) {
          user.removeMatch(match)
          user.stats.vs_protoss_games.should.equal(39)
          user.stats.vs_protoss_wins.should.equal(10)
          done()
        })
      })
    })
    it('should remove match to loser of the match', function(done) {
      factory.create('user_with_useful_info_without_recent_matches', function(err, user) {
        factory.create('match_normal_terran_vs_protoss', { player_2: user._id }, function(err, match) {
          user.removeMatch(match)
          user.stats.vs_protoss_games.should.equal(40)
          user.stats.vs_protoss_wins.should.equal(11)
          done()
        })
      })
    })
    // it('should remove match in recent match list', function(done) {
    //   // TODO
    //   done()
    // })
  })

  describe('#verifyPassword()', function() {
    it('should return true for right password', function(done) {
      factory.create('user_with_useful_info_without_recent_matches', function(err, user) {
        user.verifyPassword('testing123').should.equal(true)
        done()
      })
    })
    it('should return false for wrong password', function(done) {
      factory.create('user_with_useful_info_without_recent_matches', function(err, user) {
        user.verifyPassword('testing125').should.equal(false)
        done()
      })
    })
  })

  describe('#resetStatistics()', function() {
    it('should reset statistics', function(done) {
      factory.create('user_with_useful_info_without_recent_matches', function(err, user) {
        user.stats.vs_zerg_games.should.equal(30)
        user.stats.vs_terran_wins.should.equal(12)
        user.resetStatistics()
        user.stats.vs_zerg_games.should.equal(0)
        user.stats.vs_terran_wins.should.equal(0)
        done()
      })
    })
  })

})
