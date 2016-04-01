'use strict';

var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;
var LocalStrategy = require('passport-local').Strategy;
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

passport.use(
  new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (!user.verifyPassword(password)) return done(null, false);
        return done(null, user);
      });
    }
  )
);

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/bnet', passport.authenticate('bnet', { failureRedirect: '/login' }));

  app.get('/auth/bnet/callback',
          passport.authenticate('bnet', { failureRedirect: '/' }),
          function(req, res) {
            res.redirect('/users');
          });

  app.post('/auth/local', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/');
  });
};
