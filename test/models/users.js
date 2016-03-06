process.env.NODE_ENV = 'test';

var chai = require('chai');
var server = require('../../app');
var should = chai.should();

var User = require('../../app/models/users');
var Notification = require('../../app/models/notifications');

describe('Users', function() {
  var user;
  beforeEach(function(done) {
    User.collection.drop();
    user = new User({
      name: 'Canh' ,
      bnet_id: '1234'
    });

    user.save(function(err, u) {
      user = u;
      done();
    });
  });

  afterEach(function(done) {
    done();
  });

  describe('#addNotification()', function() {
    it('should create notification for user', function() {
      var notification = new Notification({
        message: 'test notification',
        link: '/',
        icon: 'none'
      });

      user.addNotification(notification);

      user.save(function(err, user) {
        if (err) throw err;
        user.should.include('notifications');
        user.notifications.should.have.length(1);
        user.notifications[0].message.should.equal(notification.message);
        done();
      });
    });
  });
});
