'use strict';

var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;
var config = require('./config');
var User = require('../app/models/users')

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, done);
});

passport.use(
  new BnetStrategy({
      clientID: config.bnet.clientID,
      clientSecret: config.bnet.clientSecret,
      callbackURL: config.bnet.callbackURL,
      scope: 'sc2.profile'
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        console.log(profile);

        User.findByBnetId(profile.id, function(err, user) {
          if (err) return done(err);

          if (!user) {
            user = User.newWithBnetProfile(profile);
            user.save(function(err) {
              if (err) console.log(err);

              return done(err, user);
            });
          }
          else {
            return done(err, user);
          }
        })
      });
    }
  )
);

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/bnet', passport.authenticate('bnet'));

  app.get('/auth/bnet/callback',
          passport.authenticate('bnet', { failureRedirect: '/' }),
          function(req, res) {
            res.redirect('/users');
          });
};
